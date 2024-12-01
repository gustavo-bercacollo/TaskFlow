import { Router } from "express";
import { UserController } from "@/controllers/users-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const userRouter = Router();
const userController = new UserController();


userRouter.post("/", userController.create)
userRouter.get("/", ensureAuthenticated, userController.index)
userRouter.put("/:id", ensureAuthenticated, verifyUserAuthorization(["admin"]), userController.update)
userRouter.delete("/:id", ensureAuthenticated, verifyUserAuthorization(["admin"]), userController.delete)

export { userRouter }