import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Users from '../pages/Users';
import Carts from '../pages/Orders';
import useAuthStore from '../store/authStore';

const AppRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/products"
        element={
          isAuthenticated ? <Products /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/users"
        element={
          isAuthenticated ? <Users /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/carts"
        element={
          isAuthenticated ? <Carts /> : <Navigate to="/login" />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
