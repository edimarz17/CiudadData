import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
    status?: number;
}

export function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.status || 500;
    if (statusCode >= 500) {
        console.error(`[Error] ${err.message}`);
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message || 'Internal Server Error',
            status: statusCode,
            path: req.originalUrl,
            timestamp: new Date().toISOString(),
        },
    });
}