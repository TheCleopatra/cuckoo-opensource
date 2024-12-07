import { redisClient } from "../config/redis";

export const redisService = {
    // Redis 操作方法
    async setVerificationCode(
        email: string,
        code: string,
        expireSeconds: number = 300
    ): Promise<void> {
        const key = `verification:${email}`;
        await redisClient.set(key, code, "EX", expireSeconds);
    },

    async getVerificationCode(email: string): Promise<string | null> {
        const key = `verification:${email}`;
        return await redisClient.get(key);
    },

    async deleteVerificationCode(email: string): Promise<void> {
        const key = `verification:${email}`;
        await redisClient.del(key);
    },

    async checkSendFrequency(email: string): Promise<boolean> {
        const key = `send_frequency:${email}`;
        const exists = await redisClient.exists(key);
        if (exists) {
            return false;
        }
        await redisClient.set(key, "1", "EX", 60);
        return true;
    },
};
