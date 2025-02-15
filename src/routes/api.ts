import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware"
import { UserController } from "../controllers/user.controller"

export const apiRouter = express.Router()
apiRouter.use(authMiddleware)

//User API
apiRouter.get("/api/users/current", UserController.getCurrentUser)
apiRouter.patch("/api/users/current", UserController.UpdateUser)
apiRouter.delete("/api/users/current", UserController.logout)