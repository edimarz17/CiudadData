import request from 'supertest';
import app from '../app';
import apiClient from '../utils/apiClient';

describe('Modulo health - endpoints', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it('GET /health/life/:iso3 debe devolver esperanza de vida para VEN', async () => {
        const records = [{ SpatialDim: 'VEN', Year: 2020, NumericValue: 75 }];
        jest.spyOn(apiClient, 'get').mockResolvedValue({ data: { value: records } });

        const res = await request(app).get('/health/life/VEN');

        expect(res.status).toBe(200);
        expect(res.body.data).toBeDefined();
expect(res.body.data.country).toBe('VEN');
expect(res.body.data.value).toBe(75);
    });

    it('GET /health/mortality/:iso3 debe devolver mortalidad para VEN', async () => {
        const records = [{ SpatialDim: 'VEN', Year: 2019, NumericValue: 12.3 }];
        jest.spyOn(apiClient, 'get').mockResolvedValue({ data: { value: records } });

        const res = await request(app).get('/health/mortality/VEN');

        expect(res.status).toBe(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.country).toBe('VEN');
        expect(res.body.data.value).toBe(12.3)
    });

    it('GET /health/indicator/:indicator/:iso3 debe devolver registros crudos', async () => {
        const records = [{ SpatialDim: 'VEN', Year: 2018, Value: 5 }];
        jest.spyOn(apiClient, 'get').mockResolvedValue({ data: { value: records } });

        const res = await request(app).get('/health/indicator/MORT_100/VEN');

        expect(res.status).toBe(200);
        expect(res.body.records).toBeInstanceOf(Array);
        expect(res.body.records).toEqual(records);
    });

    it('Debe manejar ISO3 inválido y retornar error', async () => {
        const res = await request(app).get('/health/life/VE'); // ISO3 inválido (2 letras)
        expect(res.status).toBeGreaterThanOrEqual(400);
        const msg = res.body?.error?.message ?? res.body?.message ?? '';
        expect(msg).toMatch(/ISO3|inválid/i);
    });
});