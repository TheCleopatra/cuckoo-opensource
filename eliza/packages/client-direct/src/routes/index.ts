import { Router, Request, Response } from "express";
import authRouter from "./auth";

const router: Router = Router();

// 基础路由
router.get("/ping", (req: Request, res: Response) => {
    res.json({ msg: "cvl-cuckoo-node is running" });
});

// 认证路由
router.use("/auth", authRouter);

export default router;
