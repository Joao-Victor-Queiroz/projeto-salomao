import mongoose from "mongoose";

const caixinhaSchema = new mongoose.Schema({
  crismando: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crismando",
    required: true,
  },
  valorPago: { type: Number, required: true },
  dataPagamento: { type: Date, required: true },
});

const Caixinha = mongoose.model("Caixinha", caixinhaSchema);

export default Caixinha;