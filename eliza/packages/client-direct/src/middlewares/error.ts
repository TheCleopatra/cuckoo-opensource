import {
    Request,
    Response,
    NextFunction,
    RequestHandler,
    ErrorRequestHandler,
} from "express";
import { ApiError } from "../utils/api_error";

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            error: err.message,
        });
    } else {
        console.error("未预期的错误:", err);
        res.status(500).json({
            success: false,
            error: "服务器内部错误",
        });
    }
};

// 捕获未处理的异步错误
const asyncHandler =
    (
        fn: (
            req: Request,
            res: Response,
            next: NextFunction
        ) => Promise<Response | void>
    ): RequestHandler =>
    (req, res, next): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

export { errorHandler, asyncHandler };
