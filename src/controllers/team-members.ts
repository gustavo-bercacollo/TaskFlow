import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "@/database/dbConfig";
import { AppError } from "@/utils/AppError";

class TeamMembersController {
  async create(request: Request, response: Response, next: NextFunction){

    const bodySchema = z.object({
      user_id: z.string().uuid(),
      team_id: z.string().uuid(),
    });

    const { user_id, team_id } = bodySchema.parse(request.body)

    const userAlreadyRegistered = await db.teamMember.findFirst({
      where: {
        id: user_id
      }
    })

    if (userAlreadyRegistered) {
      throw new AppError("User already registered")
    }

    const teamMembers = await db.teamMember.create({
      data: {
        userId: user_id,
        teamId: team_id
      },
      include: {
        user: { select: { name: true }},
        team: { select: { name: true }}
      }
    })

    response.status(201).json(teamMembers)

  }

  async index(request: Request, response: Response, next: NextFunction){

    const teamMembers = await db.teamMember.findMany({
      include: {
        user: { select: { name: true}},
        team: { select: { name: true}}
      }
    })

    response.json(teamMembers)
  }

  async update(request: Request, response: Response, next: NextFunction){

    const bodySchema = z.object({
      user_id: z.string().uuid(),
      team_id: z.string().uuid(),
    });

    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { user_id, team_id } = bodySchema.parse(request.body)

    const { id } = paramsSchema.parse(request.params)

    const teamMembers = await db.teamMember.update({
      where: {
        id
      },
      data: {
        userId: user_id,
        teamId: team_id
      }, 
      include: {
        user: { select: { name: true}},
        team: { select: { name: true}}
      }
    })

    response.json(teamMembers)

  }

  async delete(request: Request, response: Response, next: NextFunction){

    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)

    await db.teamMember.delete({
      where: {
        id
      }
    })

    response.json({message: "Team Member deleted"})
  }
}



export { TeamMembersController }