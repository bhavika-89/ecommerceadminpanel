import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/Products';
import UsersPage from './pages/Users';
import OrdersPage from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Layout />;
}

export default App;