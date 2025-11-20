import express from "express";
import {
  criarGrupo,
  listarGrupos,
  buscarGrupoPorId,
  adicionarCrismandoAoGrupo,
  editarGrupo,
  excluirGrupo,
  removerCrismandoDoGrupo
} from "../controllers/grupoController.js";
import { requireAuth } from "@clerk/express";
import { authorizedRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.get("/", listarGrupos);
router.get("/:id", buscarGrupoPorId);
router.post(
  "/",
  requireAuth(),
  authorizedRoles(["admin", "coordenador_frequencia"]),
  criarGrupo
);
router.post(
  "/:idGrupo/adicionar-crismando/:idCrismando",
  requireAuth(),
  authorizedRoles(["admin", "coordenador_frequencia"]),

  adicionarCrismandoAoGrupo
);
router.put(
  "/:id",
  requireAuth(),
  authorizedRoles(["admin", "coordenador_frequencia"]),
  editarGrupo
);
router.delete(
  "/:idGrupo",
  requireAuth(),
  authorizedRoles(["admin", "coordenador_frequencia"]),
  excluirGrupo
);
router.delete("/:idGrupo/remover-crismando/:idCrismando", removerCrismandoDoGrupo)

export default router;
