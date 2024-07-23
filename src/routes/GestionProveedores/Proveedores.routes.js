import { Router } from "express";
import { getProvedores, createProveedores, updateProveedores, deleteProveedores } from '../../controllers/GestionProveedores/Proveedores.js'
import { validarToken } from "../../middlewares/validarToken.js";

const router = Router();

router.get("/proveedores",validarToken(["admin","superAdmin"]), getProvedores);
router.post("/proveedores",validarToken(["admin","superAdmin"]), createProveedores);
router.put("/proveedores/:id",validarToken(["admin","superAdmin"]), updateProveedores);
router.delete("/proveedores/:id",validarToken(["admin","superAdmin"]), deleteProveedores);


export default router;

