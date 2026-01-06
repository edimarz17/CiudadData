import request from 'supertest';
import app from '../app';

describe('Modulo de estadistica - Poblacion', () => {
  it('Debe retornar población de China', async () => {
    const res = await request(app).get('/stats/population/CN');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('population');
    expect(res.body.data.country).toBe('China');
  });

  it('Debe manejar error si el país no existe', async () => {
    const res = await request(app).get('/stats/population/XX');
    expect(res.status).toBe(404);
    expect(res.body.error.message).toMatch(/No se encontraron datos/);
  });
});
