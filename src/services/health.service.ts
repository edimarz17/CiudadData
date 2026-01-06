import express from 'express';
import logger from '../utils/logger';
import apiClient from '../utils/apiClient';
import { WHORecord, HealthResult } from '../types/health';
import { HttpError } from '../utils/httpError';

export enum Indicators {
    LIFE_EXPECTANCY = 'WHOSIS_000001',
    MORTALITY = 'MORT_100'
}

/**
 * Normaliza y valida un codigo ISO3.
 * @param input Texto de entrada (puede venir con espacios o minúsculas).
 * @returns Código ISO3 en mayúsculas.
 * @throws HttpError 400 si el código es vacío o inválido.
 */
function validateIso3(input: string): string {
    if (!input) {
        logger.warn(`[ValidationError] Código ISO3 vacío. Petición abortada.`);
        throw new HttpError(400, 'Código ISO3 requerido');
    }
    const iso = input.trim().toUpperCase();
    if (!/^[A-Z]{3}$/.test(iso)) {
        logger.warn(`[ValidationError] El código '${input}' no es un ISO3 válido. Petición abortada.`);
        throw new HttpError(400, 'Código ISO3 inválido (debe ser 3 letras)');
    }
    return iso;
}

/**
 * Consulta la API de la OMS para un indicador y país específicos.
 * @param indicator Identificador del indicador OMS.
 * @param iso3 Código ISO3 del país.
 * @returns Lista de registros crudos devueltos por la OMS.
 */
export async function fetchIndicator(indicator: Indicators | string, iso3: string): Promise<WHORecord[]> {
    const code = validateIso3(iso3);
    logger.info(`[HealthService] Iniciando petición a la API de la OMS para el país: ${code}`);
    logger.debug(`[HealthService] Indicador solicitado: ${indicator}`);

    try {
        const url = `${indicator}?$filter=${encodeURIComponent(`SpatialDim eq '${code}'`)}`;
        const resp: any = await apiClient.get(url);
        const records: WHORecord[] = resp?.data?.value ?? [];
        logger.info(`[HealthService] Datos recibidos exitosamente: ${records.length} registros encontrados.`);

        if (records.length > 0) {
            // Priorizar TimeDim sobre Year
            const latest = records
                .slice()
                .sort((a, b) => {
                    const ay = Number(a.TimeDim ?? a.Year ?? 0) || 0;
                    const by = Number(b.TimeDim ?? b.Year ?? 0) || 0;
                    return by - ay;
                })[0];

            const latestYear = Number(latest.TimeDim ?? latest.Year ?? 0) || null;
            const latestValue = Number(latest.NumericValue ?? latest.Value ?? null) ?? null;
            logger.info(
                `[HealthService] Registro más reciente encontrado: Año ${latestYear ?? 'N/D'}, Valor ${latestValue ?? 'N/D'}`
            );
        }

        return records;
    } catch (err: any) {
        logger.error(`[HealthService] Error al consultar la OMS para ${code}: ${err?.message ?? err}`);
        throw err;
    }
}

/**
 * Extrae el año (TimeDim o Year) de un registro.
 * @param rec Registro OMS a evaluar.
 * @returns Número de año o null si no es convertible.
 */
function parseYear(rec: WHORecord): number | null {
    const val = rec.TimeDim ?? rec.Year;
    if (val == null) return null;
    const n = Number(val);
    return Number.isFinite(n) ? n : null;
}

/**
 * Extrae el valor numérico (NumericValue o Value) de un registro.
 * @param rec Registro OMS a evaluar.
 * @returns Número del valor o null si no es convertible.
 */
function parseValue(rec: WHORecord): number | null {
    const v = rec.NumericValue ?? rec.Value;
    if (v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

/**
 * Construye un resumen simplificado a partir de los registros recibidos.
 * @param records Registros crudos devueltos por la OMS.
 * @param indicatorName Nombre descriptivo del indicador.
 * @returns Resumen con país, año y valor más reciente, o null si no hay datos.
 */
function buildSummary(records: WHORecord[], indicatorName?: string): HealthResult['summary'] {
    if (!records || records.length === 0) return null;

    const latest = records
        .slice()
        .sort((a, b) => {
            const ay = parseYear(a) ?? 0;
            const by = parseYear(b) ?? 0;
            return by - ay;
        })[0];

    return {
        country: latest.SpatialDim ?? null,
        year: parseYear(latest),
        value: parseValue(latest),
        indicatorName,
        source: 'WHO Global Health Observatory',
        raw: latest
    };
}

/**
 * Obtiene la esperanza de vida al nacer para un país.
 * @param iso3 Código ISO3 del país.
 * @returns Registros crudos y resumen del dato más reciente.
 */
export async function getLifeExpectancy(iso3: string): Promise<HealthResult> {
    const records = await fetchIndicator(Indicators.LIFE_EXPECTANCY, iso3);
    const summary = buildSummary(records, 'Life Expectancy at Birth');
    return { records, summary };
}

/**
 * Obtiene la tasa de mortalidad (por 1000) para un país.
 * @param iso3 Código ISO3 del país.
 * @returns Registros crudos y resumen del dato más reciente.
 */
export async function getMortality(iso3: string): Promise<HealthResult> {
    const records = await fetchIndicator(Indicators.MORTALITY, iso3);
    const summary = buildSummary(records, 'Mortality (per 1000)');
    return { records, summary };
}

export default {
    fetchIndicator,
    getLifeExpectancy,
    getMortality,
    Indicators
};