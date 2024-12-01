import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "@/database/dbConfig";

class TasksController {
  async create(request: Request, response: Response, next: NextFunction){

    const bodySchema = z.object({
      title: z.string().min(3, "Title must be at least 3 characters long"),
      description: z.string(),
      status: z.enum(["pending", "in_progress", "completed"]),
      priority: z.enum(["low", "medium", "high"]),
      assigned_to: z.string().uuid("Invalid user ID"),
      team_id: z.string().uuid("Invalid team ID"),
    });

    const { title, description, status, priority, assigned_to, team_id } = bodySchema.parse(request.body)

    const task = await db.task.create({
      data: {
        title, 
        description,
        status,
        priority,
        assignedTo: assigned_to,
        teamId: team_id
      }
    })

    response.json(task)

  }

  async index(request: Request, response: Response, next: NextFunction){

    const task = await db.task.findMany()

    response.json(task)
  }

  async update(request: Request, response: Response, next: NextFunction){

    const bodySchema = z.object({
      title: z.string().min(3, "Title must be at least 3 characters long"),
      description: z.string(),
      status: z.enum(["pending", "in_progress", "completed"]),
      priority: z.enum(["low", "medium", "high"]),
      assigned_to: z.string().uuid("Invalid user ID"),
      team_id: z.string().uuid("Invalid team ID"),
    });

    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { title, description, status, priority, assigned_to, team_id } = bodySchema.parse(request.body)
    const { id } = paramsSchema.parse(request.params)

    const task = await db.task.update({
      where: {
        id
      },
      data: {
        title, 
        description,
        status,
        priority,
        assignedTo: assigned_to,
        teamId: team_id
      }
    })

    response.json(task)
  }

  async delete(request: Request, response: Response, next: NextFunction){

    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)

    await db.task.delete({
      where: {
        id
      }
    })

    response.json({message: "Task deleted"})
  }
}

export { TasksController }