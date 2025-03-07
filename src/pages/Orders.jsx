import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Container, CircularProgress, Alert, Typography, Box } from '@mui/material';
import CartTable from '../components/CartTable';
import CartFormModal from '../components/CartForm';
import { cartsApi } from '../api/carts';
import { toast } from 'react-toastify';

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);

  const { data: carts, isLoading, isError } = useQuery({
    queryKey: ['carts'],
    queryFn: () => cartsApi.getAll().then(res => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: cartsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
      toast.success('Cart deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete cart');
    },
  });

  const handleEdit = (cart) => {
    setSelectedCart(cart);
    setOpenModal(true);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Order Management</Typography>
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Create Cart
        </Button>
      </Box>

      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">Error loading carts</Alert>}

      <CartTable
        carts={carts || []}
        onEdit={handleEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />

      <CartFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedCart(null);
        }}
        cart={selectedCart}
      />
    </Container>
  );
}