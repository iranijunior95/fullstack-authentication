import { Router } from "express";
import UserMiddleware from "../middlewares/UserMiddleware.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import UserController from "../controllers/UserController.js";
import AuthController from "../controllers/AuthController.js";

const authRouter = Router();

authRouter.post("/auth/register", UserMiddleware.validateUserData, UserController.registerUsers);
authRouter.post("/auth/login", AuthMiddleware.validateUserData, AuthController.login);

export default authRouter;