import { Router } from "express";
import authRouter from "./AuthRouter.js";
import userRouter from "./UserRouter.js";

const router = Router();

router.get("/", (req, res) => {
    return res.status(200).json({ message: "Minha rota de api" });
});

router.use(authRouter);
router.use(userRouter);


export default router;