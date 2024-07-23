import { Router } from "express";
import { registroGeneral,loginUsuariosClientes,logoutClientes, verifyToken, getUsuarios, updateUsuarios, getIdUsuarios } from "../../controllers/GestionUsuarios/Usuarios.js";
import { validarToken } from "../../middlewares/validarToken.js";

const router = Router();

router.post('/registro',registroGeneral("cliente"));
router.post('/admin',registroGeneral("admin"));
router.post('/superadmin',registroGeneral("superAdmin"));
router.get('/verify',verifyToken);
router.get("/usuarios", validarToken(["superAdmin"]), getUsuarios)
router.get("/usuarios/:id", validarToken(["superAdmin"]), getIdUsuarios)

// router.post('/registro',registerUsuarioCliente);
router.post('/login',loginUsuariosClientes);
router.post('/logout',logoutClientes);

router.put("/usuarios/:id", validarToken(["superAdmin"]), updateUsuarios)



export default router;