import { Router } from "express";
import { getProductos, createProductos, updateProductos, deleteProductos, getIdProductos } from '../../controllers/GestionProductos/productos.controllers.js'
import { validarToken } from "../../middlewares/validarToken.js";

const router = Router();

router.get("/productos", getProductos);
router.get("/productos/:id", getIdProductos);
router.post("/productos", createProductos);
router.put("/productos/:id", updateProductos);
router.delete("/productos/:id", deleteProductos);

// validarToken(["admin","superAdmin"])

export default router;

