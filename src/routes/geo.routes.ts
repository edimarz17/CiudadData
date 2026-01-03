import { Router } from 'express';
import { getCityData, createReport } from '../controllers/geo.controller';

const router = Router();

// Endpoint: GET /geo/city/:city 
router.get('/city/:city', getCityData);

export default router;

// Endpoint: POST /geo/report
router.post('/report', createReport);

/**
 * @openapi
 * /geo/report:
 *   post:
 *     summary: Crea un nuevo reporte ciudadano
 *     tags: [Geografía]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReportInput'
 *     responses:
 *       201:
 *         description: Reporte creado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ReportInput:
 *       type: object
 *       required:
 *         - type
 *         - description
 *         - city
 *         - latitude
 *         - longitude
 *       properties:
 *         type:
 *           type: string
 *           description: Tipo de reporte
 *           example: bache
 *         description:
 *           type: string
 *           description: Descripción detallada
 *           example: Bache grande en la calle principal
 *         city:
 *           type: string
 *           description: Ciudad
 *           example: Ciudad de México
 *         latitude:
 *           type: number
 *           format: float
 *           description: Latitud
 *           example: 19.432608
 *         longitude:
 *           type: number
 *           format: float
 *           description: Longitud
 *           example: -99.133209
 */
router.post('/report', createReport);