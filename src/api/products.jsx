import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export const productsApi = {
  getAll: () => axios.get(`${API_URL}/products`),
  getById: (id) => axios.get(`${API_URL}/products/${id}`),
  create: (product) => axios.post(`${API_URL}/products`, product),
  update: (id, product) => axios.put(`${API_URL}/products/${id}`, product),
  delete: (id) => axios.delete(`${API_URL}/products/${id}`),
};