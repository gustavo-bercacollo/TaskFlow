import { Router } from "express";
import { TeamMembersController } from "@/controllers/team-members";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamMembersRouter = Router();
const teamMembersController = new TeamMembersController();

teamMembersRouter.use(ensureAuthenticated)

teamMembersRouter.post("/", verifyUserAuthorization(["admin"]), teamMembersController.create)
teamMembersRouter.get("/", teamMembersController.index)
teamMembersRouter.put("/:id", verifyUserAuthorization(["admin"]), teamMembersController.update)
teamMembersRouter.delete("/:id", verifyUserAuthorization(["admin"]), teamMembersController.delete)

export { teamMembersRouter }