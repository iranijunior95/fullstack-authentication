import { Router } from "express";
import authRouter from "./AuthRouter.js";
import userRouter from "./UserRouter.js";

const router = Router();

router.use(authRouter);
router.use(userRouter);

export default router;