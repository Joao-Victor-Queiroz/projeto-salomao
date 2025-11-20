import express from "express";
import { criarCaixinha, editarCaixinha, buscarCaixinhaPorId } from "../controllers/caixinhaControllers.js";

const router = express.Router();

router.post("/:idCrismando", criarCaixinha);
router.put("/:id", editarCaixinha);
router.get("/:id", buscarCaixinhaPorId)
export default router;