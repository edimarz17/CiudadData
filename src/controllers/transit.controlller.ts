import { Request, Response, NextFunction } from 'express';
import { getRoutesByCity, getETAByStopId } from '../services/transit.service';

export async function getRoutesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { city } = req.params;
    const routes = await getRoutesByCity(city);
    res.json({ success: true, data: routes });
  } catch (err) {
    next(err);
  }
}

export async function getETAHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { stop_id } = req.query;
    const eta = await getETAByStopId(stop_id as string);
    res.json({ success: true, data: eta });
  } catch (err) {
    next(err);
  }
}
