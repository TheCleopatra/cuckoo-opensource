import dotenv from "dotenv";
import { createHash } from "crypto";

// 加载.env文件
dotenv.config();

// 生成默认的 JWT secret（如果环境变量中没有设置）
const generateDefaultSecret = (): string => {
    return createHash("sha256").update(Date.now().toString()).digest("hex");
};

interface Config {
    jwt: {
        secret: string;
        expire: string;
    };
    openai: {
        apiKey: string | undefined;
        baseURL: string | undefined;
    };
    server: {
        port: number;
    };
    db: {
        uri: string;
    };
    email: {
        host: string;
        port: number;
        user: string;
        password: string;
    };
}

const config: Config = {
    jwt: {
        secret: process.env.JWT_SECRET || generateDefaultSecret(),
        expire: process.env.JWT_EXPIRE || "24h",
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL,
    },
    server: {
        port: parseInt(process.env.PORT || "3000", 10),
    },
    db: {
        uri:
            process.env.MONGO_URI ||
            "mongodb+srv://cleopatracaesar8:LRNlrn666!@cluster0.c0r7m.mongodb.net/",
    },
    email: {
        host: process.env.EMAIL_HOST || "smtp.example.com",
        port: parseInt(process.env.EMAIL_PORT || "587"),
        user: process.env.EMAIL_USER || "your-email@example.com",
        password: process.env.EMAIL_PASSWORD || "your-password",
    },
};

// 验证必要的环境变量
const validateConfig = (): void => {
    const requiredVars = ["jwt.secret", "openai.apiKey"];

    const missingVars = requiredVars.filter((path) => {
        const value = path
            .split(".")
            .reduce((obj: any, key) => obj?.[key], config);
        return !value;
    });

    if (missingVars.length > 0) {
        throw new Error(`缺少必要的环境变量: ${missingVars.join(", ")}`);
    }
};

export { config, validateConfig };
