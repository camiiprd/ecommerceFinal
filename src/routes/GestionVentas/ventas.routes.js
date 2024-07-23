import { Router } from "express";
import { getVentas, createVentas, getIdVentas, deleteVentas, detalleVentaJoin, updateEstadoVentas } from '../../controllers/GestionVentas/ventas.controllers.js'
import { validarToken } from "../../middlewares/validarToken.js";

const router = Router();

router.get("/ventas",validarToken(["cliente","admin","superAdmin"]), getVentas);
router.get("/ventas/:id",validarToken(["cliente","admin","superAdmin"]), getIdVentas);
router.get("/detalleVenta/:id",validarToken(["cliente","admin","superAdmin"]), detalleVentaJoin);;

router.post("/ventas",validarToken(["cliente","admin","superAdmin"]), createVentas);
router.patch("/ventas/:id",validarToken(["cliente","admin","superAdmin"]), updateEstadoVentas);

router.delete("/ventas/:id",validarToken(["cliente","admin","superAdmin"]), deleteVentas);



export default router;

