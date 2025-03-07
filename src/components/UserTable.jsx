import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name.firstname} {user.name.lastname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(user)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(user.id)}>
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