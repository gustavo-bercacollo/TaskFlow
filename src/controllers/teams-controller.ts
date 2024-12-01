import { Request, Response, NextFunction } from "express";
import { db } from "@/database/dbConfig";
import { z } from "zod";

class TeamsController {
  async create(request: Request, response: Response, next: NextFunction){

    const bodySchema = z.object({
      name: z.string().trim().min(3, { message: "Name must have at least 3 characters" }).max(100, { message: "Name must not exceed 100 characters" }),
      description: z.string().trim()
        .min(5, { message: "Description must have at least 10 characters" }).max(500, { message: "Description must not exceed 500 characters" }),
    });

    const { name, description } = bodySchema.parse(request.body)

    const team = await db.team.create({
      data: {
        name,
        description
      }
    })

    response.status(201).json(team)
  }

  async index(request: Request, response: Response, next: NextFunction){

    const teams = await db.team.findMany()

    response.json(teams)
  }

  async update(request: Request, response: Response, next: NextFunction){

    const bodySchema = z.object({
      name: z.string().trim().min(3, { message: "Name must have at least 3 characters" }).max(100, { message: "Name must not exceed 100 characters" }),
      description: z.string().trim()
        .min(5, { message: "Description must have at least 10 characters" }).max(500, { message: "Description must not exceed 500 characters" }),
    });

    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { name, description } = bodySchema.parse(request.body)
    const { id } = paramsSchema.parse(request.params)

    const team = await db.team.update({
      where: {
        id
      },
      data: {
        name,
        description
      }
    })

    response.json(team)
  }

  async delete(request: Request, response: Response, next: NextFunction){

    const paramsSchema = z.object({
      id: z.string().uuid()
    })

  
    const { id } = paramsSchema.parse(request.params)

    await db.team.delete({
      where: {
        id
      }
    })

    response.json({message: "Team deleted"})
  }
  
  
}

export { TeamsController }