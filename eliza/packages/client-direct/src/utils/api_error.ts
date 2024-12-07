export class ApiError extends Error {
    statusCode: number;
    success: boolean;
    isOperational: boolean;

    constructor(
        statusCode: number,
        message: string,
        isOperational: boolean = true
    ) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.isOperational = isOperational;

        // 捕获堆栈跟踪
        Error.captureStackTrace(this, this.constructor);
    }
}

// 常用错误类型
export const errorTypes = {
    BAD_REQUEST: (message: string = "请求无效") => new ApiError(400, message),
    UNAUTHORIZED: (message: string = "请先登录") => new ApiError(401, message),
    FORBIDDEN: (message: string = "禁止访问") => new ApiError(403, message),
    NOT_FOUND: (message: string = "资源未找到") => new ApiError(404, message),
    INTERNAL: (message: string = "服务器错误") => new ApiError(500, message),
};
