import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://lumi-re-salon.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    console.log('Intercepting request to:', config.url);

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
      console.log('Token found, Authorization header set:', config.headers['Authorization']);
    } else {
      console.log('No token found in localStorage.');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.detail || error.message;
    console.error('API Error:', message, 'on request to', error.config.url);
    return Promise.reject(new Error(message));
  }
);

export default apiClient;