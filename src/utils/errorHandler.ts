import { Request, Response, NextFunction, express } from 'express';

interface HttpError extends Error {
  status?: number;
}

export default function errorHandler(err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) {
    const status = err?.status || 500;
    // solo loguear errores severos
    if (status >= 500) {
        // mantener formato previo minimalista
        console.error(`[Error] ${err?.message ?? err}`);
    }
    // devolver estructura que los tests esperan
    const payload = { error: { message: err?.message ?? String(err) } };
    // también incluir `message` por compatibilidad
    (payload as any).message = err?.message ?? String(err);
    return res.status(status).json(payload);
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
