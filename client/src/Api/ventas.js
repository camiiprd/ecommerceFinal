import axios from './axios.js'

export const getVentasRequest = () => axios.get("/ventas");
export const getIdVentasRequest = (id)=> axios.get(`/ventas/${id}`);
export const createVentasRequest = (data)=> axios.post("/ventas",data);
export const updateEstadoVentasRequest = (id,data) => axios.patch(`/ventas/${id}`,data);
export const deleteVentasRequest = (id) => axios.delete(`/ventas/${id}`); 


export const getIdDetalleVentasRequest = (id)=> axios.get(`/detalleVenta/${id}`);
