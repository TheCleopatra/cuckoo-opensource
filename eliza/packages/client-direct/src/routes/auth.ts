import { Router } from "express";
import { authController } from "../controllers/auth";
import { validateAuthInput } from "../middlewares/auth";

const router = Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 用户注册
 *     description: 注册新用户账号
 *     tags: [认证]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: 注册成功
 */
router.post("/register", validateAuthInput, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 用户登录
 *     description: 用户登录并获取认证令牌
 *     tags: [认证]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 登录成功
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/send-code:
 *   post:
 *     summary: 发送验证码
 *     description: 向用户邮箱发送验证码
 *     tags: [认证]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: 验证码发送成功
 */
router.post("/send-code", authController.sendVerificationCode);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: 用户登出
 *     description: 注销用户登录状态
 *     tags: [认证]
 *     responses:
 *       200:
 *         description: 登出成功
 */
router.post("/logout", authController.logout);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: 获取当前用户信息
 *     description: 获取已登录用户的详细信息
 *     tags: [认证]
 *     responses:
 *       200:
 *         description: 成功获取用户信息
 */
router.get("/me", authController.getCurrentUser);

/**
 * @swagger
 * /auth/validate:
 *   post:
 *     summary: 验证令牌
 *     description: 验证用户认证令牌的有效性
 *     tags: [认证]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: 令牌验证成功
 */
router.post("/validate", authController.validateToken);

/**
 * @swagger
 * /auth/check-username:
 *   post:
 *     summary: 检查用户名可用性
 *     description: 检查用户名是否已被注册
 *     tags: [认证]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: 用户名检查完成
 */
router.post("/check-username", authController.checkUsername);

export default router;
