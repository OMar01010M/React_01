const API_BASE = 'https://crudcrud.com/api/dc30132d08664687872697013d625c84';
const RESOURCE = 'todos'; // You can change 'todos' to your preferred resource name

export const crudAPI = {
  // Create (POST)
  create: async (data) => {
    const response = await fetch(`${API_BASE}/${RESOURCE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  // Read All (GET)
  getAll: async () => {
    const response = await fetch(`${API_BASE}/${RESOURCE}`);
    return await response.json();
  },

  // Read One (GET)
  getOne: async (id) => {
    const response = await fetch(`${API_BASE}/${RESOURCE}/${id}`);
    return await response.json();
  },

  // Update (PUT)
  update: async (id, data) => {
    const response = await fetch(`${API_BASE}/${RESOURCE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  // Delete (DELETE)
  delete: async (id) => {
    const response = await fetch(`${API_BASE}/${RESOURCE}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  },
};