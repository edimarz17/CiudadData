import express from 'express';
import { errorHandler } from './utils/errorHandler';

const app = express(); app.use(express.json());
// Rutas

//Manejo de errores
app.use(errorHandler); export default app;