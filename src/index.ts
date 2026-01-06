import dotenv from 'dotenv';
import { createServer } from 'http';
import app from '../src/app';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`🚀 CiudadData API inicializada en el puerto ${PORT}`);
});
