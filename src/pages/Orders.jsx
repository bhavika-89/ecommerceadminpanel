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
import useCartStore from '../store/cartStore';

const Carts = () => {
  const {
    carts,
    fetchCarts,
    addCart,
    updateCart,
    deleteCart,
  } = useCartStore();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCart, setCurrentCart] = useState({
    userId: '',
    date: '',
    products: [{ productId: '', quantity: '' }],
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCarts();
  }, []);

  const handleOpen = () => {
    setEditMode(false);
    setCurrentCart({
      userId: '',
      date: '',
      products: [{ productId: '', quantity: '' }],
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (editMode) {
      updateCart(editId, currentCart);
    } else {
      addCart(currentCart);
    }
    setOpen(false);
  };

  const handleEdit = (cart) => {
    setEditMode(true);
    setEditId(cart.id);
    setCurrentCart(cart);
    setOpen(true);
  };

  const handleDelete = (id) => {
    deleteCart(id);
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...currentCart.products];
    updatedProducts[index][field] = value;
    setCurrentCart({ ...currentCart, products: updatedProducts });
  };

  const addProductField = () => {
    setCurrentCart({
      ...currentCart,
      products: [...currentCart.products, { productId: '', quantity: '' }],
    });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Carts
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        Add Cart
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts?.map((cart) => (
              <TableRow key={cart.id}>
                <TableCell>{cart.userId}</TableCell>
                <TableCell>{cart.date}</TableCell>
                <TableCell>
                  {cart.products?.map((prod, idx) => (
                    <Box key={idx}>
                      Product ID: {prod.productId}, Qty: {prod.quantity}
                    </Box>
                  ))}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEdit(cart)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(cart.id)}
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
        <DialogTitle>{editMode ? 'Edit Cart' : 'Add Cart'}</DialogTitle>
        <DialogContent>
          <TextField
            label="User ID"
            fullWidth
            margin="dense"
            value={currentCart.userId}
            onChange={(e) =>
              setCurrentCart({ ...currentCart, userId: e.target.value })
            }
          />
          <TextField
            label="Date"
            fullWidth
            margin="dense"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentCart.date}
            onChange={(e) =>
              setCurrentCart({ ...currentCart, date: e.target.value })
            }
          />

          {currentCart.products.map((product, index) => (
            <Box key={index} display="flex" gap={2} mt={1}>
              <TextField
                label="Product ID"
                fullWidth
                value={product.productId}
                onChange={(e) =>
                  handleProductChange(index, 'productId', e.target.value)
                }
              />
              <TextField
                label="Quantity"
                fullWidth
                value={product.quantity}
                onChange={(e) =>
                  handleProductChange(index, 'quantity', e.target.value)
                }
              />
            </Box>
          ))}

          <Button onClick={addProductField} sx={{ mt: 2 }}>
            + Add Product
          </Button>
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

export default Carts;
