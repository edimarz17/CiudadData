import { Router } from 'express';
import { getCityData, createReport } from '../controllers/geo.controller';

const router = Router();

// Endpoint: GET /geo/city/:city 
router.get('/city/:city', getCityData);

export default router;

// Endpoint: POST /geo/report
router.post('/report', createReport);