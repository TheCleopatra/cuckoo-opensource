import Redis from "ioredis";
import { config } from "./env.config";

interface RedisConfig {
    host: string;
    port: number;
    password: string;
    retryStrategy: (times: number) => number;
}

const redisConfig: RedisConfig = {
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
    retryStrategy(times: number) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
};

const redisClient = new Redis(redisConfig);

redisClient.on("error", (err: Error) => {
    console.error("Redis 连接错误:", err);
});

redisClient.on("connect", () => {
    console.log("Redis 连接成功");
});

process.on("SIGTERM", async () => {
    await redisClient.quit();
});

export { redisClient };
