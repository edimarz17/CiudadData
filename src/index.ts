import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import express from 'express';
import geoRoutes from './routes/geo.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Registro de rutas del modulo geografico 
app.use('/geo', geoRoutes);

app.listen(PORT, () => {
  console.log(`CiudadData API corriendo en http://localhost:${PORT}`);
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ciudaddata';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error no conectado a MongoDB:', err));

// Configuracion de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CiudadData API',
      version: '1.0.0',
      description: 'API para la gestión de datos urbanos, salud y transporte - UCAB',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  
  apis: ['./src/routes/*.ts'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Endpoint para ver la documentacion
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
