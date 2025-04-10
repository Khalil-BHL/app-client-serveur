import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, Button, TextField, Grid, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await axios.put(`${API_URL}/users/${editingId}`, formData);
        console.log('Update response:', response);
        if (response.status === 200) {
          toast.success('User updated successfully');
          fetchUsers();
        }
      } else {
        const response = await axios.post(`${API_URL}/users`, formData);
        console.log('Create response:', response);
        if (response.status === 201) {
          toast.success('User created successfully');
          fetchUsers();
        }
      }
      setFormData({ name: '', email: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Submit error:', error.response || error);
      toast.error(editingId ? 'Failed to update user' : 'Failed to create user');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`);
      console.log('Delete response:', response);
      if (response.status === 200) {
        toast.success('User deleted successfully');
        fetchUsers();
      }
    } catch (error) {
      console.error('Delete error:', error.response || error);
      toast.error('Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditingId(user.id);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ToastContainer position="top-right" />
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          {editingId ? 'Edit User' : 'Add New User'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ height: '100%' }}
              >
                {editingId ? 'Update' : 'Add'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Users List
        </Typography>
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} key={user.id}>
              <Paper elevation={1} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Typography variant="subtitle1">{user.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                </div>
                <div>
                  <IconButton onClick={() => handleEdit(user)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} color="error">
                    <Delete />
                  </IconButton>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;

