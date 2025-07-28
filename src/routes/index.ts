import { Router } from "express";
import authRouter from "./auth.route";
import plannerRouter from "./planner.route";
const router = Router();

router.use("/auth", authRouter);
router.use("/planner", plannerRouter);

export default router;
