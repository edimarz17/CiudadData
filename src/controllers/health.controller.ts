import express from 'express';
import { getLifeExpectancy, getMortality, fetchIndicator } from '../services/health.service';


export const getLifeHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { iso3 } = req.params;
        const result = await getLifeExpectancy(iso3);
        // result tiene forma { records, summary }
        return res.status(200).json({
            success: true,
            data: result.summary 
        });
    } catch (err) {
        return next(err);
    }
    
};


export const getMortalityHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { iso3 } = req.params;
        const result = await getMortality(iso3);
        return res.status(200).json({
            success: true,
            data: result.summary 
        });
    } catch (err) {
        return next(err);
    }
};


export const getIndicatorHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { indicator, iso3 } = req.params;
        const records = await fetchIndicator(indicator, iso3);
        return res.status(200).json({ success: true, records });
    } catch (err) {
        return next(err);
    }
};