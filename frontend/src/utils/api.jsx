import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/api/auth/signup', data),
  login: (data) => api.post('/api/auth/login', data),
  getMe: () => api.get('/api/auth/getme')
};

// Vehicle APIs
export const vehicleAPI = {
  getAll: (params) => api.get('/api/vehicles', { params }),
  getOne: (id) => api.get(`/api/vehicles/${id}`),
  create: (data) => api.post('/api/vehicles', data),
  update: (id, data) => api.put(`/api/vehicles/${id}`, data),
  delete: (id) => api.delete(`/api/vehicles/${id}`)
};

// Test Drive APIs
export const testDriveAPI = {
  getAll: (params) => api.get('/api/testdrives', { params }),
  getOne: (id) => api.get(`/api/testdrives/${id}`),
  create: (data) => api.post('/api/testdrives', data),
  update: (id, data) => api.put(`/api/testdrives/${id}`, data),
  delete: (id) => api.delete(`/api/testdrives/${id}`)
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => api.get('/api/dashboard/stats')
};

export default api;