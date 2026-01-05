import axios from 'axios';
import fs from 'fs';
import path from 'path';
import {parse} from 'csv-parse/lib/sync';
import config from '../config/env';

export async function fetchRoutesFromGTFS() {
  const filePath = path.join(__dirname, '../../data/routes.txt');
  const content = fs.readFileSync(filePath, 'utf-8');
  const records = parse(content, { columns: true });

  return records.map((r: any) => ({
    route_id: r.route_id,
    short_name: r.route_short_name,
    long_name: r.route_long_name,
    type: r.route_type === '3' ? 'bus' : 'unknown'
  }));
}

export async function fetchETAFromMTA(stopId: string) {
  const url = `https://bustime.mta.info/api/siri/stop-monitoring.json?key=${config.mtaApiKey}&MonitoringRef=${stopId}`;
  const response = await axios.get(url);
  const data: any = response.data;

  const visit =
    data?.Siri?.ServiceDelivery?.StopMonitoringDelivery?.[0]?.MonitoredStopVisit?.[0];

  if (!visit) {
    throw { status: 404, message: 'No se encontraron datos de ETA para ese stop_id' };
  }

  const j = visit.MonitoredVehicleJourney;

  return {
    stop_id: stopId,
    line: j.LineRef ?? 'N/A',
    vehicle: j.VehicleRef ?? 'N/A',
    eta: j.MonitoredCall?.ExpectedArrivalTime ?? j.MonitoredCall?.ExpectedDepartureTime ?? null,
    destination: j.DestinationName ?? 'N/A'
  };
}
