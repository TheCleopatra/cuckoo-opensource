import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    const connectionWithRetry = async (): Promise<void> => {
        console.log("正在连接 MongoDB...");
        try {
            await mongoose.connect(
                process.env.MONGO_URI ||
                    "mongodb+srv://cleopatracaesar8:LRNlrn666!@cluster0.c0r7m.mongodb.net/",
                {
                    dbName: process.env.MONGO_DB_NAME || "stg",
                }
            );
            console.log("数据库连接成功。");
        } catch (err) {
            console.error("连接 MongoDB 失败 - 5秒后重试", err);
            setTimeout(connectionWithRetry, 5000);
        }
    };
    await connectionWithRetry();

    const db = mongoose.connection;
    db.on("connected", () => {
        console.log("MongoDB 连接已建立");
    });
    db.on("error", (err: Error) => {
        console.error("MongoDB 连接错误:", err);
    });
};

export default connectDB;
