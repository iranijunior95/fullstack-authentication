import { Router } from "express";
import authRouter from "./AuthRouter.js";

const router = Router();

router.get("/", (req, res) => {
    return res.status(200).json({ message: "Minha rota de api" });
});

router.use(authRouter);

export default router;