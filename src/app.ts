import express from 'express';
import morgan from 'morgan';
import logger from './utils/logger';
import healthRoutes from './routes/health.routes';
import errorHandler from './utils/errorHandler';

const app = express();

// Morgan -> nuestro logger
const morganStream = { write: (msg: string) => logger.info(msg.trim()) };
app.use(morgan(':method :url :status :response-time ms', { stream: morganStream }));

app.use(express.json());

// Montar rutas de health en /health
app.use('/health', healthRoutes);

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

export default app;