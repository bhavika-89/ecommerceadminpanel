import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, ShoppingCart, People, Inventory } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/products">
          <ListItemIcon><Inventory /></ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/orders">
          <ListItemIcon><ShoppingCart /></ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
      </List>
    </Drawer>
  );
}