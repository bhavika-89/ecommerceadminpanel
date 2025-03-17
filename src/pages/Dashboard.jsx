import { Typography, Box } from '@mui/material';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  return (
    <Box>
      <Sidebar />
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography>
        Welcome to the Admin Panel
      </Typography>
    </Box>
  );
}