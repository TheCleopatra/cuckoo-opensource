import { errorTypes } from "../utils/api_error";
import jwt from "jsonwebtoken";
import { config } from "../config/env.config";
import userSchema from "../models/user";
import UserActivity from "../models/user_activity";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

interface User {
    _id: mongoose.Types.ObjectId;
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

interface CleanUser {
    _id: mongoose.Types.ObjectId;
    id: string;
    username: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

interface LoginResponse {
    success: boolean;
    data: {
        user: CleanUser;
        token: string;
    };
}

export const authService = {
    // 注册新用户
    async register(
        username: string,
        password: string,
        email: string = "", // 设置默认值为空字符串
        _verificationCode: string = "" // 设置默认值为空字符串
    ): Promise<Omit<User, "password">> {
        const _id = new mongoose.Types.ObjectId();
        // 创建新用户,id系统指定
        const newUser: User = {
            _id,
            id: _id.toString(),
            username: username,
            email: email,
            password: password,
            role: "user",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // 入库
        await userSchema.create(newUser);

        // 返回用户信息（不包含密码）
        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    },

    // 用户登录
    async login(username: string, password: string): Promise<LoginResponse> {
        // 查询用户是否存在
        let user = await userSchema.findOne({
            $or: [{ username: username }],
        });

        if (!user) {
            // 用户不存在则注册
            const registeredUser = await this.register(username, password);
            user = await userSchema.findOne({ id: registeredUser.id });
            if (!user) {
                throw errorTypes.BAD_REQUEST("注册失败");
            }
        } else {
            // 验证密码
            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordValid) {
                throw errorTypes.BAD_REQUEST("您的密码不正确");
            }
        }

        // 记录登录活动
        await this.logActivity(user.id, "login");

        // 生成 token
        const token = this.generateToken(user.id);

        // 构造清理后的用户数据
        const cleanUser: CleanUser = {
            _id: user._id as unknown as mongoose.Types.ObjectId,
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        // 返回清理后的数据
        return {
            success: true,
            data: {
                user: cleanUser,
                token,
            },
        };
    },

    // 验证token
    async validateToken(token: string): Promise<CleanUser | null> {
        try {
            // 验证token
            const decoded = jwt.verify(token, config.jwt.secret) as {
                id: string;
            };

            // 检查用户是否存在（可选，但建议保留）
            const user = await userSchema.findOne({ id: decoded.id });

            if (!user) {
                return null;
            }

            return {
                _id: user._id as mongoose.Types.ObjectId,
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        } catch {
            return null;
        }
    },

    // 记录用户活动
    async logActivity(userId: string, type: string): Promise<void> {
        await UserActivity.create({
            userId,
            type,
        });
    },

    // 获取用户最近活动
    async getLastActivity(userId: string) {
        return UserActivity.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();
    },

    async logout(userId: string, _token: string): Promise<void> {
        // 记录登出活动
        await this.logActivity(userId, "logout");
    },

    // 获取用户信息
    async getUserByUsername(
        username: string
    ): Promise<Omit<User, "password"> | null> {
        const user = await userSchema.findOne({
            username,
        });

        if (!user) {
            return null;
        }

        const userObj = {
            ...user.toObject(),
            _id: user._id as mongoose.Types.ObjectId,
        };
        const { password, ...userWithoutPassword } = userObj;
        return userWithoutPassword;
    },

    // 工具方法：生成JWT token
    generateToken(id: string): string {
        if (!config.jwt.secret) {
            throw new Error("JWT_SECRET is not defined");
        }

        return jwt.sign({ id }, config.jwt.secret, {
            expiresIn: config.jwt.expire,
        });
    },
};
