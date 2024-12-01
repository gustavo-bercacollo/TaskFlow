import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller";7
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { verifyTaskUser } from "@/middlewares/verifyTaskUser";

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.use(ensureAuthenticated)

tasksRouter.post("/",verifyUserAuthorization(["admin"]), tasksController.create)
tasksRouter.get("/", tasksController.index)
tasksRouter.put("/:id", verifyTaskUser, tasksController.update)
tasksRouter.delete("/:id", verifyTaskUser, tasksController.delete)


export { tasksRouter }