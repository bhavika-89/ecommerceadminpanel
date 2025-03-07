import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Container, CircularProgress, Alert, Typography, Box } from '@mui/material';
import UserTable from '../components/UserTable';
import UserFormModal from '../components/UserForm';
import { usersApi } from '../api/users';
import { toast } from 'react-toastify';

export default function UsersPage() {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersApi.getAll().then(res => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: usersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete user');
    },
  });

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">User Management</Typography>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add User
        </Button>
      </Box>

      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">Error loading users</Alert>}

      <UserTable
        users={users || []}
        onEdit={handleEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />

      <UserFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </Container>
  );
}