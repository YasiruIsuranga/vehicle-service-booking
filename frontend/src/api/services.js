import axios from './axios';

// Auth APIs
export const login = (credentials) => axios.post('/auth/login', credentials);
export const register = (userData) => axios.post('/auth/register', userData);
export const getProfile = () => axios.get('/auth/profile');

// Booking APIs
export const createBooking = (bookingData) => axios.post('/bookings', bookingData);
export const getAllBookings = (params) => axios.get('/bookings', { params });
export const getBookingById = (id) => axios.get(`/bookings/${id}`);
export const updateBookingStatus = (id, status) => axios.put(`/bookings/${id}/status`, { status });
export const deleteBooking = (id) => axios.delete(`/bookings/${id}`);
export const getBookingStats = () => axios.get('/bookings/stats');

// Service APIs
export const getAllServices = () => axios.get('/services');
export const createService = (serviceData) => axios.post('/services', serviceData);
export const updateService = (id, serviceData) => axios.put(`/services/${id}`, serviceData);
export const deleteService = (id) => axios.delete(`/services/${id}`);