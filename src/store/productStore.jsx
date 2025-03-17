import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const useProductStore = create((set) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const res = await axios.get('https://fakestoreapi.com/products');
      set({ products: res.data });
    } catch (err) {
      toast.error('Failed to fetch products');
    }
  },

  addProduct: async (product) => {
    try {
      const res = await axios.post('https://fakestoreapi.com/products', product);
      set((state) => ({ products: [...state.products, res.data] }));
      toast.success('Product added successfully!');
    } catch (err) {
      toast.error('Failed to add product');
    }
  },

  updateProduct: async (id, product) => {
    try {
      const res = await axios.put(`https://fakestoreapi.com/products/${id}`, product);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? res.data : p)),
      }));
      toast.success('Product updated successfully!');
    } catch (err) {
      toast.error('Failed to update product');
    }
  },

  deleteProduct: async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
      toast.success('Product deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete product');
    }
  },
}));

export default useProductStore;
