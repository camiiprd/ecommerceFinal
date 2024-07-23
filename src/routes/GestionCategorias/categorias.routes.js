import { Router } from "express";
import { getCategoria, createCategoria, updateCategoria, deleteCategoria } from '../../controllers/GestionCategorias/categorias.controllers.js'
import { validarToken } from "../../middlewares/validarToken.js";


const router = Router();

router.get("/categorias", getCategoria);
router.post("/categorias",validarToken(["admin","superAdmin"]), createCategoria);
router.put("/categorias/:id",validarToken(["admin","superAdmin"]), updateCategoria);
router.delete("/categorias/:id",validarToken(["admin","superAdmin"]), deleteCategoria);


export default router;