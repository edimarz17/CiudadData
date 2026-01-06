import apiClient from '../utils/apiClient';


export class GeoService {

  private static readonly USERNAME = process.env.GEONAMES_USERNAME || '';
  private static readonly BASE_URL = 'http://api.geonames.org/searchJSON';

  static async getCityData(city: string) {
    console.log("Usuario usado:", this.USERNAME);
    try {
      const response = await apiClient.get(this.BASE_URL, {
        params: {
          q: city,
          maxRows: 1,
          username: this.USERNAME,
        },
      });

      // Validacion de seguridad para la respuesta
      if (!response.data.geonames || response.data.geonames.length === 0) {
        return null; // 404 
      }

      const data = response.data.geonames[0];
      return {
        name: data.name,
        country: data.countryName,
        lat: data.lat,
        lng: data.lng,
      };
    } catch (error) {
      console.error("Error en GeoService:", error);
      throw error;
    }
  }
}