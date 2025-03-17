import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const useUserStore = create((set) => ({
  users: [],

  fetchUsers: async () => {
    try {
      const res = await axios.get('https://fakestoreapi.com/users');
      set({ users: res.data });
    } catch (err) {
      toast.error('Failed to fetch users');
    }
  },

  addUser: async (user) => {
    try {
      const formattedUser = {
        email: user.email,
        username: user.username,
        password: user.password,
        name: {
          firstname: user.firstname,
          lastname: user.lastname,
        },
        address: {
          city: user.city,
          street: user.street,
          number: user.number,
          zipcode: user.zipcode,
          geolocation: {
            lat: user.lat,
            long: user.long,
          },
        },
        phone: user.phone,
      };
      const res = await axios.post('https://fakestoreapi.com/users', formattedUser);
      set((state) => ({ users: [...state.users, res.data] }));
      toast.success('User added successfully!');
    } catch (err) {
      toast.error('Failed to add user');
    }
  },

  updateUser: async (id, user) => {
    try {
      const formattedUser = {
        email: user.email,
        username: user.username,
        password: user.password,
        name: {
          firstname: user.firstname,
          lastname: user.lastname,
        },
        address: {
          city: user.city,
          street: user.street,
          number: user.number,
          zipcode: user.zipcode,
          geolocation: {
            lat: user.lat,
            long: user.long,
          },
        },
        phone: user.phone,
      };
      const res = await axios.put(`https://fakestoreapi.com/users/${id}`, formattedUser);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? res.data : u)),
      }));
      toast.success('User updated successfully!');
    } catch (err) {
      toast.error('Failed to update user');
    }
  },

  deleteUser: async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/users/${id}`);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
      toast.success('User deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete user');
    }
  },
}));

export default useUserStore;
