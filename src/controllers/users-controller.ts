import { Request, Response, NextFunction } from "express";
import { db } from "@/database/dbConfig";
import { z } from "zod"
import { hash } from "bcrypt"
import { AppError } from "@/utils/AppError";


class UserController {
  async create(request: Request, response: Response, next: NextFunction){

    const bodySchema = z.object({
      name: z.string().trim().min(2, { message: "Name must have at least 2 characters" }),
      email: z.string().email({ message: "Invalid email format" }),
      password: z.string().min(6, { message: "Password must have at least 6 characters" }),
    });

    const { name, email, password } = bodySchema.parse(request.body)

    const emailExists = await db.user.findFirst({ where: { email }})

    if(emailExists){
      throw new AppError("User with same email already exists")
    }

    const hashedPassword = await hash(password, 8)
    
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const {password:_, ...userWithoutPassword} = user


    response.status(201).json(userWithoutPassword)
  }

  async index(request: Request, response: Response, next: NextFunction){

    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })
  
    response.json(users)
  }

  async update(request: Request, response: Response, next: NextFunction){

    const bodySchema = z.object({
      name: z.string().trim().min(3, { message: "Name must have at least 3 characters" }),
      email: z.string().email({ message: "Invalid email format" }),
      password: z.string().min(6, { message: "Password must have at least 6 characters" }),
    });

    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { name, email, password } = bodySchema.parse(request.body)
    const { id } = paramsSchema.parse(request.params)

    const user = await db.user.update({ 
      where: {
        id
      },
      data: {
        name,
        email,
        password
      },
       select: {  
        id: true,  
        name: true,
        email: true,
      }
    })

    response.json(user)
  }

  async delete(request: Request, response: Response, next: NextFunction){

    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)

    await db.user.delete({
      where: {
        id
      }
    })
    

    response.json({message: "User deleted"})
  }
}

export { UserController }