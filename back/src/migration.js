// back/src/migration.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Crismando from "./models/CrismandoModel.js";

dotenv.config();

const runMigration = async () => {
  try {
    console.log("Conectando ao MongoDB para migração...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado.");

    console.log("Iniciando a atualização dos documentos...");
    const response = await Crismando.updateMany(
      { ativo: { $exists: false } },
      { $set: { ativo: true } }
    );

    console.log("Migração concluída.");
    console.log(
      `Documentos encontrados para atualização: ${response.matchedCount}`
    );
    console.log(
      `Documentos atualizados com sucesso: ${response.modifiedCount}`
    );
  } catch (error) {
    console.error("Erro durante a migração:", error);
  } finally {
    console.log("Desconectando do MongoDB.");
    await mongoose.disconnect();
  }
};

runMigration();
