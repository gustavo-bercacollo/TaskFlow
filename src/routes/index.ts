import { Router } from "express";
import { userRouter } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { teamsRouter } from "./teams-routes";
import { teamMembersRouter } from "./team-members-routes";
import { tasksRouter } from "./tasks-routes";

const routes = Router();

routes.use("/users", userRouter)
routes.use("/sessions", sessionsRoutes)
routes.use("/teams", teamsRouter)
routes.use("/team-members", teamMembersRouter)
routes.use("/tasks", tasksRouter)



export { routes }