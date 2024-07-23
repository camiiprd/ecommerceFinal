import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const validarToken = (rolesPermitidos)=>{
    return (req,res,next)=>{
        try {
            const { token } = req.cookies;
            if(!token) return res.status(401).json({message:'No existen el token no autorizado'});
            jwt.verify(token, TOKEN_SECRET,(error, user)=>{
                if(error) return res.status(500).send("Token invalido");
                req.user = user;
                if(!rolesPermitidos.includes(req.user.rol)) return res.status(403).send('No tienes permisos');
                next(); 
            })
        } catch (error) {
          console.log(error);
          console.log("Error en valida token")
        }
    }
}
