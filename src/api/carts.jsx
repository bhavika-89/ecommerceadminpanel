import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export const cartsApi = {
  getAll: () => axios.get(`${API_URL}/carts`),
  getById: (id) => axios.get(`${API_URL}/carts/${id}`),
  create: (cart) => axios.post(`${API_URL}/carts`, cart),
  update: (id, cart) => axios.put(`${API_URL}/carts/${id}`, cart),
  delete: (id) => axios.delete(`${API_URL}/carts/${id}`),
};