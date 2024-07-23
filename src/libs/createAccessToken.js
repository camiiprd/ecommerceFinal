import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken';



export const createAccesToken = (data = {})=>{
    try {
        return jwt.sign(data,TOKEN_SECRET)
    } catch (error) {
        console.log("Error en la creacion del token",error)
    }
}