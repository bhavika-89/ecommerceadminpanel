import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Container, CircularProgress, Alert } from '@mui/material';
import ProductTable from '../components/ProductTable';
import ProductFormModal from '../components/ProductForm';
import { productsApi } from '../api/products';
import { toast } from 'react-toastify';

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsApi.getAll().then(res => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    }
  });

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  return (
    <Container>
      <Button variant="contained" onClick={() => setOpenModal(true)} sx={{ mb: 2 }}>
        Add Product
      </Button>

      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">Error loading products</Alert>}

      <ProductTable
        products={products || []}
        onEdit={handleEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
      />

      <ProductFormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />
    </Container>
  );
}