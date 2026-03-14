import { Router } from "express";
import UserMiddleware from "../middlewares/UserMiddleware.js";
import UserController from "../controllers/UserController.js";

const authRouter = Router();

authRouter.post("/auth/register", UserMiddleware.validateUserData, UserController.registerUsers);

export default authRouter;