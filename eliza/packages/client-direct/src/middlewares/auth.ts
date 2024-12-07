import { Request, Response, NextFunction } from "express";
import { errorTypes } from "../utils/api_error";
import { authService } from "../services/auth";

// 验证登录注册输入的中间件, 用户名和邮箱至少输入一个，密码不能为空
export const validateAuthInput = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        throw errorTypes.BAD_REQUEST("用户名和邮箱至少输入一个");
    }

    if (email && !email.includes("@")) {
        throw errorTypes.BAD_REQUEST("邮箱格式不正确");
    }

    if (
        username &&
        (typeof username !== "string" ||
            username.length < 3 ||
            username.length > 20)
    ) {
        throw errorTypes.BAD_REQUEST("用户名长度必须在3-20个字符之间");
    }

    if (!password) {
        throw errorTypes.BAD_REQUEST("密码不能为空");
    }

    if (
        typeof password !== "string" ||
        password.length < 6 ||
        password.length > 20
    ) {
        throw errorTypes.BAD_REQUEST("密码长度必须在6-20个字符之间");
    }

    next();
};

interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        [key: string]: any;
    };
}

// 验证token的中间件
export const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res
                .status(401)
                .json({ success: false, error: "用户未认证" });
        }

        const token = authHeader.split(" ")[1]; // 正确提取token

        try {
            const user = await authService.validateToken(token);

            if (!user) {
                throw errorTypes.UNAUTHORIZED("无效的token");
            }

            req.user = user
                ? {
                      ...user,
                      id: user.id.toString(),
                  }
                : undefined;

            next();
        } catch {
            return res.status(401).json({ success: false, error: "token无效" });
        }
    } catch {
        return res.status(401).json({ success: false, error: "用户未认证" });
    }
};
