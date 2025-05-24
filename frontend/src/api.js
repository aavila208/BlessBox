import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

console.log("🌐 API base URL:", import.meta.env.VITE_API_URL);

// 🔐 Automatically inject token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.token = token;
  return config;
});

export default api;
