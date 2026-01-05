import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import statsRoutes from './routes/stats.routes';
import transitRoutes from './routes/transit.routes';
import healthRoutes from './routes/health.routes';
import geoRoutes from './routes/geo.routes';

import { errorHandler } from './utils/errorHandler';
import logger from './utils/logger';

const app = express();


const morganStream = { write: (msg: string) => logger.info(msg.trim()) };
app.use(morgan(':method :url :status :response-time ms', { stream: morganStream }));


app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CiudadData API',
      version: '1.0.0',
      description: 'API para la gestión de datos urbanos, salud y transporte - UCAB',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/routes/*.ts'], 
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);


app.use('/stats', statsRoutes);
app.use('/transit', transitRoutes);
app.use('/health', healthRoutes);
app.use('/geo', geoRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

export default app;