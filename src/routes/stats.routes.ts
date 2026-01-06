import { Router } from 'express';
import { populationHandler } from '../controllers/stats.controller';

const router = Router();

/*url relativo del endpoint*/
router.get('/population/:country', populationHandler);

/**
 * @swagger
 * /stats/population/{country}:
 *   get:
 *     summary: Obtener población por pais
 *     description: Devuelve datos demograficos actualizados desde la API del Banco Mundial
 *     tags: [Stats]
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         schema:
 *           type: string
 *         description: Codigo del pais (ej. "VE", "US" "ES")
 *     responses:
 *       200:
 *         description: Datos de poblacion obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 country:
 *                   type: string
 *                   example: "United States"
 *                 population:
 *                   type: number
 *                   example: 331002651
 *                 year:
 *                   type: number
 *                   example: 2020
 *                 growthRate:
 *                   type: number
 *                   example: 0.71
 *       400:
 *         description: El parametro del pais es obligatorio
 *       404:
 *         description: Pais no encontrado
 *       500:
 *         description: Error al consultar la API del Banco Mundial
 */

export default router;
