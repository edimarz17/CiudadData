import express from 'express';

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
}