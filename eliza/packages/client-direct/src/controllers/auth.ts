import { Request, Response } from "express";
import { authService } from "../services/auth";
import { errorTypes } from "../utils/api_error";
import { asyncHandler } from "../middlewares/error";
import { AuthenticatedRequest } from "../types/auth";
import userSchema from "../models/user";
import { emailService } from "../services/email";

export const authController = {
    // 用户注册
    register: asyncHandler(async (req: Request, res: Response) => {
        const { username, password, email, verificationCode } = req.body;

        if (!verificationCode) {
            throw errorTypes.BAD_REQUEST("验证码不能为空");
        }

        const user = await authService.register(
            username,
            password,
            email,
            verificationCode
        );

        res.json({
            success: true,
            data: {
                user: user,
            },
        });
    }),

    // 发送验证码
    sendVerificationCode: asyncHandler(async (req: Request, res: Response) => {
        const { email } = req.body;

        if (!email) {
            throw errorTypes.BAD_REQUEST("邮箱不能为空");
        }

        // 检查邮箱是否已被注册
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            throw errorTypes.BAD_REQUEST("该邮箱已被注册");
        }

        await emailService.sendVerificationCode(email);

        res.json({
            success: true,
            message: "验证码已发送",
        });
    }),

    // 用户登录
    login: asyncHandler(async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const loginResponse = await authService.login(username, password);

        res.json(loginResponse);
    }),

    // 获取当前用户信息
    getCurrentUser: asyncHandler(
        async (req: AuthenticatedRequest, res: Response) => {
            // req.user 由 auth 中间件注入
            if (!req.user) {
                throw errorTypes.UNAUTHORIZED();
            }

            res.json({
                success: true,
                data: {
                    user: req.user,
                },
            });
        }
    ),

    // 用户登出
    logout: asyncHandler(async (req: Request, res: Response) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            throw errorTypes.UNAUTHORIZED();
        }

        const user = await authService.validateToken(token);

        if (token && user) {
            await authService.logout(user.id, token);
        }

        res.json({
            success: true,
            message: "已成功登出",
        });
    }),

    // 验证 token
    validateToken: asyncHandler(async (req: Request, res: Response) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            throw errorTypes.UNAUTHORIZED("未提供token");
        }

        try {
            const user = await authService.validateToken(token);

            if (!user) {
                throw errorTypes.UNAUTHORIZED("无效的token");
            }

            res.json({
                success: true,
                data: {
                    isValid: true,
                    user,
                },
            });
        } catch (error) {
            res.json({
                success: false,
                data: {
                    isValid: false,
                    message: "无效或过期的token ",
                    error,
                },
            });
        }
    }),

    // 检查用户名是否存在
    checkUsername: asyncHandler(async (req: Request, res: Response) => {
        const { username } = req.body;

        if (!username) {
            throw errorTypes.BAD_REQUEST("用户名不能为空");
        }

        const user = await userSchema.findOne({ username });

        res.json({
            success: true,
            exists: !!user,
        });
    }),
};
