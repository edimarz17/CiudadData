import { Request, Response, NextFunction } from 'express';

// Interfaz para manejar codigos de estado en los errores
interface HttpError extends Error {
  status?: number;
}


export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Unificacion del codigo de estado (por defecto 500)
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Registro minimalista de errores severos (>= 500)
  if (status >= 500) {
    console.error(`[Error] ${message}`);
  }


  res.status(status).json({
    success: false,
    message: message, // Nivel raíz para compatibilidad con tests y librerías
    error: {
      message: message,
      status: status,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
    },
  });
};
