import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { usersApi } from '../api/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function UserFormModal({ open, onClose, user }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: user || {},
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      user ? usersApi.update(user.id, data) : usersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success(`User ${user ? 'updated' : 'created'} successfully`);
      onClose();
      reset();
    },
    onError: (error) => {
      toast.error(`Failed to ${user ? 'update' : 'create'} user`);
    },
  });

  useEffect(() => {
    if (user) reset(user);
  }, [user, reset]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {user ? 'Edit User' : 'Create User'}
        </Typography>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            {...register('name.firstname', { required: true })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            {...register('name.lastname', { required: true })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            {...register('email', { required: true })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            {...register('username', { required: true })}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}