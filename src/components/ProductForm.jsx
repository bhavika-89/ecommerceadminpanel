import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { productsApi } from '../api/products';
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

export default function ProductFormModal({ open, onClose, product }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: product || {},
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      product ? productsApi.update(product.id, data) : productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(`Product ${product ? 'updated' : 'created'} successfully`);
      onClose();
      reset();
    },
    onError: (error) => {
      toast.error(`Failed to ${product ? 'update' : 'create'} product`);
    },
  });

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {product ? 'Edit Product' : 'Create Product'}
        </Typography>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            {...register('title', { required: true })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            type="number"
            {...register('price', { required: true })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={4}
            {...register('description', { required: true })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Category"
            {...register('category', { required: true })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            {...register('image', { required: true })}
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