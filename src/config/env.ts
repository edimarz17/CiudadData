import dotenv from 'dotenv';
dotenv.config();

const config = {
  geonamesUser: process.env.GEONAMES_USER || '',
  whoApiKey: process.env.WHO_API_KEY || '',
  mtaApiKey: process.env.MTA_API_KEY || '',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ciudaddata'
};

export default config;
