import express from 'express';
import { getLifeHandler, getMortalityHandler, getIndicatorHandler } from '../controllers/health.controller';

const router = express.Router();

router.get('/life/:iso3', getLifeHandler);
router.get('/mortality/:iso3', getMortalityHandler);
router.get('/indicator/:indicator/:iso3', getIndicatorHandler);

export default router;