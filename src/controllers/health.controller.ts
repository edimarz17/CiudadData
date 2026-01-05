import express from 'express';
import { getLifeExpectancy, getMortality, fetchIndicator } from '../services/health.service';

/**
 * Responde con la esperanza de vida para un país dado (código ISO3).
 * @param req Petición Express con `iso3` en params.
 * @param res Respuesta Express usada para devolver el payload.
 * @param next Middleware `next` para propagar errores.
 */
export const getLifeHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { iso3 } = req.params;
        const result = await getLifeExpectancy(iso3);
        // result tiene forma { records, summary }
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
};

/**
 * Responde con la tasa de mortalidad para un país dado (código ISO3).
 * @param req Petición Express con `iso3` en params.
 * @param res Respuesta Express usada para devolver el payload.
 * @param next Middleware `next` para propagar errores.
 */
export const getMortalityHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { iso3 } = req.params;
        const result = await getMortality(iso3);
        return res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
};

/**
 * Responde con cualquier indicador OMS solicitado para un país dado.
 * @param req Petición Express con `indicator` y `iso3` en params.
 * @param res Respuesta Express usada para devolver los registros crudos.
 * @param next Middleware `next` para propagar errores.
 */
export const getIndicatorHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { indicator, iso3 } = req.params;
        const records = await fetchIndicator(indicator, iso3);
        return res.status(200).json({ records });
    } catch (err) {
        return next(err);
    }
};