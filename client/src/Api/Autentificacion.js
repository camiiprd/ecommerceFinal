import axios from './axios.js'

export const getUsuarios = () => axios.get("/usuarios");
export const getIdUsuariosRequest = (id)=> axios.get(`/usuarios/${id}`);
export const loginUsuario = (data)=> axios.post("/login",data)
export const createUsuarios = (data)=> axios.post("/registro",data);
export const createUsuariosSuperAdminRequest = (data)=> axios.post("/superadmin",data);

export const updateUsuariosRequest = (id,data)=> axios.put(`/usuarios/${id}`,data);

export const verifyTokenRequest = ()=> axios.get("/verify");

