import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import geoRoutes from './routes/geo.routes';
import statsRoutes from './routes/stats.routes';
import { errorHandler } from './utils/errorHandler';
const app = express(); app.use(express.json()); 
// Rutas 
    app.use('/stats', statsRoutes); 
    app.use('/geo', geoRoutes);

// Configuracion de Swagger
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Manejo de errores 
    app.use(errorHandler); export default app;