import { Router } from 'express';
import { getRoutesHandler, getETAHandler } from '../controllers/transit.controlller';

const router = Router();

router.get('/routes/:city', getRoutesHandler);
router.get('/eta', getETAHandler);

/**
 * @swagger
 * /transit/routes/{city}:
 *   get:
 *     summary: Obtener rutas de transporte por ciudad (MTA)
 *     description: Devuelve las rutas de transporte disponibles para una ciudad especifica
 *     tags: [Transit]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *           example: "nyc"
 *         description: Nombre de la ciudad a filtrar (ej. nyc, london, tokyo)
 *     responses:
 *       200:
 *         description: Rutas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 city:
 *                   type: string
 *                   example: "nyc"
 *                 totalRoutes:
 *                   type: integer
 *                   example: 10
 *                 routes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "M-1"
 *                       name:
 *                         type: string
 *                         example: "Línea 1"
 *                       type:
 *                         type: string
 *                         example: "metro"
 *                       color:
 *                         type: string
 *                         example: "#FF0000"
 *       400:
 *         description: Parámetros inválidos
 *       404:
 *         description: No se encontraron rutas para la ciudad especificada
 *       500:
 *         description: Error al conectar con el servicio de la MTA
 */

export default router;