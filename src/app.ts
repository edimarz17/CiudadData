import express from 'express'; 
import statsRoutes from './routes/stats.routes';
import { errorHandler } from './utils/errorHandler';

const app = express(); app.use(express.json()); 
// Rutas 
    app.use('/stats', statsRoutes); 
//Manejo de errores 
    app.use(errorHandler); export default app;