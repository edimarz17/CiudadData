import axios from 'axios';

const BASE_URL = 'https://ghoapi.azureedge.net/api/';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        Accept: 'application/json'
    }
});

export default apiClient;