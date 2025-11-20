import express from "express";
import {
  criarCrismando,
  listarCrismandos,
  buscarCrismandoPorId,
  crismandosLivres,
  editarCrismando,
  excluirCrismando
} from "../controllers/crismandoController.js";
// import { authenticateVerification } from "../middlewares/auth.js";
// import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import {requireAuth} from "@clerk/express"

const router = express.Router();


router.post("/", criarCrismando);
router.get("/", listarCrismandos);
router.put("/:id", editarCrismando);
router.get("/crismandos-livres", crismandosLivres);
router.get("/:id", buscarCrismandoPorId);
router.delete("/:id", excluirCrismando)

export default router;
