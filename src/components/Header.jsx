import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { logout } = useAuth();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button color="inherit" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}