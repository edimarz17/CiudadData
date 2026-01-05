import { Router } from 'express';
import { getRoutesHandler, getETAHandler } from '../controllers/transit.controlller';

const router = Router();

router.get('/routes/:city', getRoutesHandler);
router.get('/eta', getETAHandler);

export default router;
