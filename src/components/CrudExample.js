import React, { useState, useEffect } from 'react';
import { crudAPI } from '../api/crudService';

const CrudExample = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ 
    name: '', 
    description: '' 
  });
  const [editItemId, setEditItemId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', description: '' });

  // Fetch items on component mount
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
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await crudAPI.delete(id);
      fetchItems(); // Refresh the list
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
    setEditItemId(null); // Exit edit mode immediately
    setEditItem({ name: '', description: '' });
    try {
      await crudAPI.update(editItemId, editItem);
      await fetchItems(); // Then refresh the data
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
      <h2>CRUD Operations</h2>
      
      <form onSubmit={handleSubmit} className="crud-form">
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <button type="submit">
          Add Item
        </button>
      </form>

      {items.length > 0 ? (
        <table className="crud-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                {editItemId === item._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editItem.name}
                        onChange={handleEditInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        value={editItem.description}
                        onChange={handleEditInputChange}
                      />
                    </td>
                    <td>
                      <button 
                        className="save-btn"
                        onClick={handleEditSubmit}
                        style={{marginRight: '6px'}}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <span
                        style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={() => handleNameClick(item)}
                        title="View details"
                      >
                        {item.name}
                      </span>
                    </td>
                    <td>{item.description}</td>
                    <td>
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditClick(item)}
                        style={{marginRight: '6px'}}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: '20px', textAlign: 'center' }}>No items found. Add your first item!</p>
      )}
    </div>
  );
};

export default CrudExample;