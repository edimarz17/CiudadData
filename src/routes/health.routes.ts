import express from 'express';
import { getLifeHandler, getMortalityHandler, getIndicatorHandler } from '../controllers/health.controller';

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary:  Estado de salud del modulo
 *     description: Verifica si el servicio de salud está en línea.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Servicio operativo
 */
router.get('/', (req, res) => res.json({ status: "UP", module: "Health" }));

/**
 * @swagger
 * /health/life/{iso3}:
 *   get:
 *     summary:   Obtener esperanza de vida por país
 *     description: Retorna la esperanza de vida al nacer usando datos de la OMS.
 *     tags: [Health]
 *     parameters:
 *       - in: path
 *         name: iso3
 *         required: true
 *         schema:
 *           type: string
 *         description: Código ISO3 del país (ej. "VEN", "COL")
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente
 *       400:
 *         description: Código ISO3 inválido
 */
router.get('/life/:iso3', getLifeHandler);

/**
 * @swagger
 * /health/mortality/{iso3}:
 *   get:
 *     summary: Obtener tasa de mortalidad por país
 *     description: Retorna la tasa de mortalidad para el país especificado (datos OMS).
 *     tags: [Health]
 *     parameters:
 *       - in: path
 *         name: iso3
 *         required: true
 *         schema:
 *           type: string
 *         description: Código ISO3 del país
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente
 */
router.get('/mortality/:iso3', getMortalityHandler);

/**
 * @swagger
 * /health/indicator/{indicator}/{iso3}:
 *   get:
 *     summary: Obtener un indicador de salud específico
 *     description: Consulta cualquier indicador de la OMS mediante su código técnico.
 *     tags: [Health]
 *     parameters:
 *       - in: path
 *         name: indicator
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del indicador (ej. "WHOSIS_000001")
 *       - in: path
 *         name: iso3
 *         required: true
 *         schema:
 *           type: string
 *         description: Código ISO3 del país
 *     responses:
 *       200:
 *         description: Indicador obtenido exitosamente
 */
router.get('/indicator/:indicator/:iso3', getIndicatorHandler);



export default router;