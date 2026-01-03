import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import app from './app'; // Importamos la app ya configurada

dotenv.config();

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/ciudaddata';

// Conexión a MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Conexión exitosa a MongoDB'))
  .catch((err) => console.error('❌ Error de conexión a MongoDB:', err));

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 CiudadData API inicializada en el puerto ${PORT}`);
  console.log(`📄 Swagger disponible en http://localhost:${PORT}/api-docs`);
});