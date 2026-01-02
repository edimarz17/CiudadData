import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import express from 'express';
import geoRoutes from './routes/geo.routes';


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