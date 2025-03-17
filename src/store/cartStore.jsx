import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const useCartStore = create((set) => ({
  carts: [],

  fetchCarts: async () => {
    try {
      const res = await axios.get('https://fakestoreapi.com/carts');
      set({ carts: res.data });
    } catch (err) {
      toast.error('Failed to fetch carts');
    }
  },

  addCart: async (cart) => {
    try {
      const res = await axios.post('https://fakestoreapi.com/carts', cart);
      set((state) => ({ carts: [...state.carts, res.data] }));
      toast.success('Cart added successfully!');
    } catch (err) {
      toast.error('Failed to add cart');
    }
  },

  updateCart: async (id, cart) => {
    try {
      const res = await axios.put(`https://fakestoreapi.com/carts/${id}`, cart);
      set((state) => ({
        carts: state.carts.map((c) => (c.id === id ? res.data : c)),
      }));
      toast.success('Cart updated successfully!');
    } catch (err) {
      toast.error('Failed to update cart');
    }
  },

  deleteCart: async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/carts/${id}`);
      set((state) => ({
        carts: state.carts.filter((c) => c.id !== id),
      }));
      toast.success('Cart deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete cart');
    }
  },
}));

export default useCartStore;
