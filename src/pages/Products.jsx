import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import useProductStore from '../store/productStore';

const Products = () => {
  const {
    products,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpen = () => {
    setEditMode(false);
    setCurrentProduct({
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (editMode) {
      updateProduct(editId, currentProduct);
    } else {
      addProduct(currentProduct);
    }
    setOpen(false);
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditId(product.id);
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        Add Product
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEdit(product)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={currentProduct.title}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, title: e.target.value })
            }
          />
          <TextField
            label="Price"
            fullWidth
            margin="dense"
            value={currentProduct.price}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, price: e.target.value })
            }
          />
          <TextField
            label="Category"
            fullWidth
            margin="dense"
            value={currentProduct.category}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, category: e.target.value })
            }
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            multiline
            value={currentProduct.description}
            onChange={(e) =>
              setCurrentProduct({
                ...currentProduct,
                description: e.target.value,
              })
            }
          />
          <TextField
            label="Image URL"
            fullWidth
            margin="dense"
            value={currentProduct.image}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, image: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
