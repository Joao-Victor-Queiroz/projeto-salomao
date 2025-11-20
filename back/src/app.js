import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import crismandoRoutes from "./routes/crismandoRoutes.js";
import grupoRoutes from "./routes/grupoRoutes.js";
import frequenciaRoutes from "./routes/frequenciaRoutes.js";
import caixinhaRoutes from "./routes/caixinhaRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.use("/crismandos", crismandoRoutes);
app.use("/grupos-crismandos", grupoRoutes);
app.use("/frequencia", frequenciaRoutes);
app.use("/caixinha", caixinhaRoutes);

export default app;
