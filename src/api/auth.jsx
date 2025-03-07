import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export const authApi = {
  login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),
};