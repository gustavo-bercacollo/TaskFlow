import { Request, Response, NextFunction } from "express";
import { z } from "zod"
import { db } from "@/database/dbConfig";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken"

class SessionsController {
  async create(request: Request, response: Response, next: NextFunction){

    const bodySchema = z.object({
      email: z.string().email({ message: "Invalid email format" }),
      password: z.string().min(6, { message: "Password must have at least 6 characters" }),
    });

    const { email, password } = bodySchema.parse(request.body)

    const user = await db.user.findFirst({ where: {email}})

    if(!user){
      throw new AppError("Invalid email or password", 401)
    }

    const comparePassword = await compare(password, user.password)

    if(!comparePassword){
      throw new AppError("Invalid email or password", 401)
    }
    
    const { secret, expiresIn } = authConfig.jwt

    const token = sign({role: user.role ?? "member" }, secret, {
      subject: user.id,
      expiresIn
    }) 

    const {password:_, ...userWithoutPassword} = user
    
    response.json({token, userWithoutPassword})
  }
}

export { SessionsController }