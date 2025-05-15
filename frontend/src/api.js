import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Vite exposes this env variable
  // You can add common headers here if needed
});

export default api;
