import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/ciudaddata';

// Conectar a la base de datos
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(' Conexión exitosa a MongoDB');
    
    // Iniciar el servidor 
    const server = createServer(app);
    
    server.listen(PORT, () => {
      console.log(` CiudadData API inicializada en el puerto ${PORT}`);
      console.log(` Swagger disponible en: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error(' Error fatal: No se pudo conectar a MongoDB:', err);
    process.exit(1); // Detiene el proceso si no hay DB
  });
