import axios from 'axios';

const WORLD_BANK_BASE_URL = 'http://api.worldbank.org/v2';

export async function getPopulationByCountry(countryCode: string) {
  try {
    const url = `${WORLD_BANK_BASE_URL}/country/${countryCode}/indicator/SP.POP.TOTL?format=json`;
    const response = await axios.get(url);
    
    const data = (response.data as any)?.[1];
    if (!Array.isArray(data) || data.length === 0) {
      const err: any = new Error('No se encontraron datos de población');
      err.status = 404;
      throw err;
    }

    const latest = data[0];
    return {
      country: latest.country.value,
      year: latest.date,
      population: latest.value,
    };
  } catch (error: any) {
    if (error?.status === 404 || error?.response?.status === 404) {
      const err: any = new Error('No se encontraron datos de población');
      err.status = 404;
      throw err;
    }

    const err: any = new Error(error?.message || 'Error al consultar World Bank API');
    err.status = error?.status || error?.response?.status || 500;
    throw err;
  }
}















