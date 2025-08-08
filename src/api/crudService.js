const API_BASE = 'https://crudcrud.com/api/1d438e85558945fdb2b29c448144e7bd';
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
    if (!response.ok) {
      throw new Error(`Failed to update resource with id ${id}: ${response.status}`);
    }
    // Some backends (e.g., crudcrud.com) return an empty body for PUT. Return a boolean.
    return true;
  },

  // Delete (DELETE)
  delete: async (id) => {
    const response = await fetch(`${API_BASE}/${RESOURCE}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  },
};