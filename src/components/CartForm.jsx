import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Modal, Box, TextField, Button, Typography, IconButton, MenuItem } from '@mui/material';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; 
import { cartsApi } from '../api/carts';
import { toast } from 'react-toastify';
import { usersApi } from '../api/users';
import { productsApi } from '../api/products';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function CartFormModal({ open, onClose, cart }) {
  const queryClient = useQueryClient();
  const { control, register, handleSubmit, reset, setValue } = useForm({
    defaultValues: cart || { userId: 0, products: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersApi.getAll().then(res => res.data),
  });

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsApi.getAll().then(res => res.data),
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      cart ? cartsApi.update(cart.id, data) : cartsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] });
      toast.success(`Cart ${cart ? 'updated' : 'created'} successfully`);
      onClose();
      reset();
    },
    onError: (error) => {
      toast.error(`Failed to ${cart ? 'update' : 'create'} cart`);
    },
  });

  useEffect(() => {
    if (cart) {
      setValue('userId', cart.userId);
      setValue('products', cart.products);
    }
  }, [cart, setValue]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {cart ? 'Edit Cart' : 'Create Cart'}
        </Typography>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <TextField
            select
            fullWidth
            margin="normal"
            label="User"
            {...register('userId', { required: true })}
          >
            {users?.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name.firstname} {user.name.lastname}
              </MenuItem>
            ))}
          </TextField>

          <Typography variant="subtitle1" mt={2}>Products</Typography>
          
          {fields.map((field, index) => (
            <Box key={field.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                select
                fullWidth
                margin="normal"
                label="Product"
                {...register(`products.${index}.productId`, { required: true })}
              >
                {products?.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.title}
                  </MenuItem>
                ))}
              </TextField>
              
              <TextField
                type="number"
                label="Quantity"
                {...register(`products.${index}.quantity`, { required: true })}
              />
              
              <IconButton onClick={() => remove(index)}>
                <RemoveCircle color="error" />
              </IconButton>
            </Box>
          ))}

          <Button
            startIcon={<AddCircle />}
            onClick={() => append({ productId: 0, quantity: 1 })}
            sx={{ mt: 1 }}
          >
            Add Product
          </Button>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}