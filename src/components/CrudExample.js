import React, { useState, useEffect } from 'react';
import { crudAPI } from '../api/crudService';

const CrudExample = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ 
    name: '', 
    description: '' 
  });

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

  return (
    <div style={{ padding: '20px' }}>
      <h2>CRUD Operations</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="text"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
          placeholder="Description"
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button 
          type="submit"
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Item
        </button>
      </form>

      {items.length > 0 ? (
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          marginTop: '20px'
        }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.description}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    style={{ 
                      padding: '6px 12px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: '20px' }}>No items found. Add your first item!</p>
      )}
    </div>
  );
};

export default CrudExample;