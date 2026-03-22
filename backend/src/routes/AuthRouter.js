import { Router } from "express";
import UserMiddleware from "../middlewares/UserMiddleware.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import UserController from "../controllers/UserController.js";
import AuthController from "../controllers/AuthController.js";

const authRouter = Router();

authRouter.post("/auth/register", UserMiddleware.validateUserData, UserController.registerUsers);
authRouter.post("/auth/login", AuthMiddleware.validateUserData, AuthController.login);
authRouter.get("/auth/logout", AuthController.logout);

//Rota para validar autenticação no frontend
authRouter.get("/auth/me", AuthMiddleware.validateAccessAuthentication, (req, res) => {
    return res.json(req.userData);
});

export default authRouter;