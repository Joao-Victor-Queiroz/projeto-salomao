import express from "express";
import { editarFrequencia, registrarFrequencia, buscarFrequenciaPorId} from "../controllers/frequenciaControllers.js";

const router = express.Router();

router.post("/", registrarFrequencia);
router.put("/:id", editarFrequencia);
router.get("/:id", buscarFrequenciaPorId);

export default router;