import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import useUserStore from '../store/userStore';

const Users = () => {
  const { users, fetchUsers, addUser, updateUser, deleteUser } = useUserStore();
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: '',
    city: '',
    street: '',
    number: '',
    zipcode: '',
    lat: '',
    long: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpen = (user = null) => {
    setEditingUser(user);
    if (user) {
      setFormData({
        email: user.email,
        username: user.username,
        password: user.password || '',
        firstname: user.name.firstname,
        lastname: user.name.lastname,
        phone: user.phone,
        city: user.address.city,
        street: user.address.street,
        number: user.address.number,
        zipcode: user.address.zipcode,
        lat: user.address.geolocation.lat,
        long: user.address.geolocation.long,
      });
    } else {
      setFormData({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        phone: '',
        city: '',
        street: '',
        number: '',
        zipcode: '',
        lat: '',
        long: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingUser) {
      await updateUser(editingUser.id, formData);
    } else {
      await addUser(formData);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add User
      </Button>

      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.name.firstname} {user.name.lastname}
              </TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address.city}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleOpen(user)}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          {[
            'email',
            'username',
            'password',
            'firstname',
            'lastname',
            'phone',
            'city',
            'street',
            'number',
            'zipcode',
            'lat',
            'long',
          ].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              fullWidth
              value={formData[field]}
              onChange={handleChange}
              type={field === 'password' ? 'password' : 'text'}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingUser ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
