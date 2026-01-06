import { Router } from 'express';
import { getCityData, createReport } from '../controllers/geo.controller';

const router = Router();

/**
 * @swagger
 * /geo/city/{city}:
 *   get:
 *     summary: Obtener datos geográficos de una ciudad
 *     description: Consulta coordenadas y país de una ciudad usando la API de GeoNames.
 *     tags: [Geografía]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la ciudad (ej. "Caracas", "Madrid")
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente
 *       404:
 *         description: Ciudad no encontrada
 */
router.get('/city/:city', getCityData);

/**
 * @swagger
 * /geo/report:
 *   post:
 *     summary: Crea un nuevo reporte ciudadano
 *     description: Registra un reporte (ej. bache, semáforo) en la base de datos MongoDB.
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
router.post('/report', createReport);

/**
 * @swagger
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
 *           example: "bache"
 *         description:
 *           type: string
 *           example: "Bache grande en la calle principal"
 *         city:
 *           type: string
 *           example: "Caracas"
 *         latitude:
 *           type: number
 *           example: 10.4806
 *         longitude:
 *           type: number
 *           example: -66.9036
 */

export default router;