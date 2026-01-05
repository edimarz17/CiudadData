import dotenv from 'dotenv';
dotenv.config();

const config = {
  geonamesUser: process.env.GEONAMES_USER || '',
  whoApiKey: process.env.WHO_API_KEY || '',
  mtaApiKey: process.env.MTA_API_KEY || ''
};

export default config;
