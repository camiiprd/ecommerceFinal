import { Router } from "express";
import { getFormaPago, createFormaPago, updateFormaPago, deleteFormaPago } from "../../controllers/GestionMedioPagos/medioPagos.controllers.js";
import { validarToken } from "../../middlewares/validarToken.js";

const router = Router();

router.get("/formaPago", getFormaPago)
router.post("/formaPago",validarToken(["admin","superAdmin"]), createFormaPago)
router.put("/formaPago/:id",validarToken(["admin","superAdmin"]), updateFormaPago)
router.delete("/formaPago/:id",validarToken(["admin","superAdmin"]), deleteFormaPago)

export default router;