import { fetchRoutesFromGTFS, fetchETAFromMTA } from '../utils/mtaClient';

export async function getRoutesByCity(city: string) {
  if (city.toLowerCase() !== 'nyc') {
    throw { status: 400, message: 'Solo se soporta NYC' };
  }
  return await fetchRoutesFromGTFS();
}

export async function getETAByStopId(stopId: string) {
  if (!stopId) {
    throw { status: 400, message: 'Falta el parámetro stop_id' };
  }
  return await fetchETAFromMTA(stopId);
}
