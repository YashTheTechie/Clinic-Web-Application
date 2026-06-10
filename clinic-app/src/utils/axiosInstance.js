// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request Interceptor: Appends token safely
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('patientToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Safe session eviction
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only flush keys if an explicit authentication breakdown happens on patient routes
    if (error.response && error.response.status === 401) {
      const isPatientRoute = !window.location.pathname.startsWith('/admin');
      
      if (isPatientRoute) {
        localStorage.removeItem('patientToken');
        localStorage.removeItem('patientData');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;