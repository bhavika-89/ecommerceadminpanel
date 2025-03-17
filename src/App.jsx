import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import {
  CssBaseline,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useAuthStore from './store/authStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;

const App = () => {
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {/* App Bar */}
        {isAuthenticated && (
          <>
            <AppBar
              position="fixed"
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                  Admin Panel
                </Typography>
                <Typography
                  onClick={handleLogout}
                  sx={{ cursor: 'pointer', fontWeight: 500 }}
                >
                  Logout
                </Typography>
              </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
              }}
            >
              <Toolbar />
              <List>
                <ListItem button component={Link} to="/dashboard">
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/products">
                  <ListItemText primary="Products" />
                </ListItem>
                <ListItem button component={Link} to="/users">
                  <ListItemText primary="Users" />
                </ListItem>
                <ListItem button component={Link} to="/carts">
                  <ListItemText primary="Carts" />
                </ListItem>
              </List>
            </Drawer>
          </>
        )}

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: isAuthenticated ? `calc(100% - ${drawerWidth}px)` : '100%',
          }}
        >
          {isAuthenticated && <Toolbar />}
          <AppRoutes />
        </Box>

        {/* Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </Box>
    </BrowserRouter>
  );
};

export default App;
