import axios from 'axios';

const apiClient = axios.create({
  timeout: 10000, // 10 segundos de espera antes de fallar
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor opcional: util para debuguear peticiones en consola durante desarrollo
apiClient.interceptors.request.use((config) => {
  console.log(`[API Request] ${config.method?.toUpperCase()} a: ${config.url}`);
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;