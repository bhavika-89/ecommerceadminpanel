import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function CartTable({ carts, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cart ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carts.map((cart) => (
            <TableRow key={cart.id}>
              <TableCell>{cart.id}</TableCell>
              <TableCell>{cart.userId}</TableCell>
              <TableCell>{new Date(cart.date).toLocaleDateString()}</TableCell>
              <TableCell>
                {cart.products.map((product) => (
                  <div key={product.productId}>
                    Product {product.productId} x {product.quantity}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(cart)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(cart.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}