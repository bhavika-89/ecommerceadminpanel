import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(product)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(product.id)}>
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