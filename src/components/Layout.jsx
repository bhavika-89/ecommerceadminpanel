import { Outlet, Navigate } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Header />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: '240px', 
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}