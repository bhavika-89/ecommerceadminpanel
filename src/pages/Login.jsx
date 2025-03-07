import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Box, Typography, Paper } from '@mui/material';
import { authApi } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await authApi.login(data);
      login(response.data.token); 
      navigate('/');
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Admin Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              {...register('username', { required: 'Username is required' })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}