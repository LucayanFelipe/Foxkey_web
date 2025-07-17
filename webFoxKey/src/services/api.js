import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5247', // ou a URL da sua API
});

export default api;