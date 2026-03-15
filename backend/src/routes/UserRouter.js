import { Router } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import UserController from "../controllers/UserController.js";

const userRouter = Router();

userRouter.get("/profile", AuthMiddleware.validateAccessAuthentication, UserController.retrieveUserDataByID);

export default userRouter;