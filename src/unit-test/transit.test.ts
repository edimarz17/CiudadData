import request from 'supertest';
import app from '../app';

jest.mock('../utils/mtaClient', () => ({
  fetchRoutesFromGTFS: jest.fn().mockResolvedValue([
    { route_id: '1', short_name: 'M1', long_name: 'Mocked Line' }
  ]),
  fetchETAFromMTA: jest.fn((stopId: any) => {
    if (stopId === '308214') {
      return Promise.resolve({ stop_id: '308214', eta: '2026-01-05T00:00:00Z', line: 'M1', destination: 'Queens Center' });
    }
    const err: any = new Error('No se encontraron datos de ETA para ese stop_id');
    err.status = 404;
    return Promise.reject(err);
  })
}));



describe('Módulo de Transporte - Rutas', () => {
  it('Debe retornar lista de rutas para NYC', async () => {
    const res = await request(app).get('/transit/routes/nyc');

    console.log('Rutas NYC:', res.body.data);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0]).toHaveProperty('route_id');
    expect(res.body.data[0]).toHaveProperty('short_name');
    expect(res.body.data[0]).toHaveProperty('long_name');
  });

  it('Debe manejar error si la ciudad no está soportada', async () => {
    const res = await request(app).get('/transit/routes/caracas');

    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/Solo se soporta NYC/);
  });
});

describe('Módulo de Transporte - ETA', () => {
  it('Debe retornar ETA para un stop válido', async () => {
    const res = await request(app).get('/transit/eta?stop_id=308214');

    console.log('ETA Stop 308214:', res.body.data);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('stop_id', '308214');
    expect(res.body.data).toHaveProperty('eta');
    expect(res.body.data).toHaveProperty('line');
    expect(res.body.data).toHaveProperty('destination');
  });

  it('Debe manejar error si el stop_id no existe', async () => {
    const res = await request(app).get('/transit/eta?stop_id=XXXXXX');

    expect(res.status).toBe(404);
    expect(res.body.error.message).toMatch(/No se encontraron datos de ETA/);
  });
});
