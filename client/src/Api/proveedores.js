import axios from './axios.js';

export const getProveedoresRequest = () => axios.get("/proveedores");
export const getIdProveedoresRequest = (id) => axios.get(`/proveedores/${id}`);
export const createProveedoresRequest = (data) => axios.post("/proveedores", data);
export const updateProveedoresRequest = (id, data) => axios.put(`/proveedores/${id}`, data);
export const deleteProveedoresRequest = (id) => axios.delete(`/proveedores/${id}`);