//Conexão com  mongoDB

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI 
    );
    console.log("MongoDB conectado!");
  } catch (error) {
    console.error("Erro ao conectar:", error);
    process.exit(1);
  }
};

export default connectDB;
