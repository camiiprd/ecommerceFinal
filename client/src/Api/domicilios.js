import axios from './axios.js'

export const getDomiciliosUsers = () => axios.get("/domicilios")
export const getIdDomiciliosRequest = (id) => axios.get(`/domicilios/${id}`);

export const createDomiciliosUsers = (data) => axios.post("/domicilios",data);