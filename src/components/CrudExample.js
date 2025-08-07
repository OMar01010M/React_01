import React, { useState, useEffect } from 'react';
import { crudAPI } from '../api/crudService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const CrudExample = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [editItemId, setEditItemId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', description: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await crudAPI.getAll();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crudAPI.create(newItem);
      setNewItem({ name: '', description: '' });
      fetchItems();
      setSnackbar({ open: true, message: 'Item added!' });
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await crudAPI.delete(id);
      fetchItems();
      setSnackbar({ open: true, message: 'Item deleted!' });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditItemId(item._id);
    setEditItem({ name: item.name, description: item.description });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem({
      ...editItem,
      [name]: value
    });
  };

  const handleEditSubmit = async () => {
    setEditItemId(null);
    setEditItem({ name: '', description: '' });
    try {
      await crudAPI.update(editItemId, editItem);
      fetchItems();
      setSnackbar({ open: true, message: 'Item updated!' });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleEditCancel = () => {
    setEditItemId(null);
    setEditItem({ name: '', description: '' });
  };

  const handleNameClick = (item) => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>${item.name} - Details</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; padding: 40px; }
            .details-container { background: #fff; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); padding: 32px; max-width: 400px; margin: 40px auto; }
            h2 { margin-top: 0; color: #2563eb; }
            p { font-size: 1.1rem; color: #22223b; }
          </style>
        </head>
        <body>
          <div class="details-container">
            <h2>${item.name}</h2>
            <p><strong>Description:</strong> ${item.description || '<em>No description</em>'}</p>
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="crud-container">
      <h2 style={{ textAlign: 'center', marginBottom: 32 }}>CRUD Operations</h2>
      <form onSubmit={handleSubmit} className="crud-form" style={{ marginBottom: 32, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          style={{ padding: 10, borderRadius: 6, border: '1px solid #c9c9c9', fontSize: '1rem' }}
        />
        <input
          type="text"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
          placeholder="Description"
          style={{ padding: 10, borderRadius: 6, border: '1px solid #c9c9c9', fontSize: '1rem' }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 2, fontWeight: 500 }}>
          Add Item
        </Button>
      </form>
      {items.length > 0 ? (
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} key={item._id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  {editItemId === item._id ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={editItem.name}
                        onChange={handleEditInputChange}
                        style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 5, border: '1px solid #c9c9c9', fontSize: '1rem' }}
                      />
                      <input
                        type="text"
                        name="description"
                        value={editItem.description}
                        onChange={handleEditInputChange}
                        style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 5, border: '1px solid #c9c9c9', fontSize: '1rem' }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleEditSubmit}
                        sx={{ mr: 1, borderRadius: 2 }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<CancelIcon />}
                        onClick={handleEditCancel}
                        sx={{ borderRadius: 2 }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="h6"
                        component="span"
                        sx={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={() => handleNameClick(item)}
                        title="View details"
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {item.description}
                      </Typography>
                      <IconButton color="primary" onClick={() => handleEditClick(item)} sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          No items found. Add your first item!
        </Typography>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </div>
  );
};

export default CrudExample;