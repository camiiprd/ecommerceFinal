import axios from './axios.js'

export const getCategoriasRequest = () => axios.get("/categorias");
export const getIdCategoriasRequest = (id) => axios.get(`/categorias/${id}`);
export const createCategoriasRequest = (data) => axios.post("/categorias", data);
export const updateCategoriasRequest = (id, data) => axios.put(`/categorias/${id}`, data);
export const deleteCategoriasRequest = (id) => axios.delete(`/categorias/${id}`);
