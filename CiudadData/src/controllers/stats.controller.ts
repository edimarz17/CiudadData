import { Request, Response, NextFunction } from 'express';
import { getPopulationByCountry } from '../services/stats.service';

export async function populationHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { country } = req.params; // Ejemplo: CN  para china
    const result = await getPopulationByCountry(country);
    console.log('[DEBUG] population result:', result);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

