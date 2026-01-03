import { Router } from 'express';
import { populationHandler } from '../controllers/stats.controller';

const router = Router();

//url del endpoint
router.get('/population/:country', populationHandler);

export default router;
