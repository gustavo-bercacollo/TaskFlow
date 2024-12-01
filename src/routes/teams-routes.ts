import { Router } from "express";
import { TeamsController } from "@/controllers/teams-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.use(ensureAuthenticated)

teamsRouter.post("/", verifyUserAuthorization(["admin"]), teamsController.create)
teamsRouter.get("/", teamsController.index)
teamsRouter.put("/:id", verifyUserAuthorization(["admin"]), teamsController.update)
teamsRouter.delete("/:id", verifyUserAuthorization(["admin"]), teamsController.delete)

export { teamsRouter }