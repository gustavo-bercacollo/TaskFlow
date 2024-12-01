import { Request, Response, NextFunction } from "express";
import { db } from "@/database/dbConfig";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

async function verifyTaskUser(request: Request, response: Response, next: NextFunction) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const { id } = paramsSchema.parse(request.params);
    const user = request.user;

    if (!user) {
      throw new AppError("User not authenticated", 401);
    }

    const task = await db.task.findUnique({
      where: { id },
      select: { assignedTo: true },
    });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    if (task.assignedTo !== user.id && user.role !== "admin") {
      throw new AppError("Unauthorized, you are not allowed to edit this task", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
}

export { verifyTaskUser }