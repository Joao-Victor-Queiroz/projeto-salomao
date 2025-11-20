import mongoose from "mongoose"

const frequenciaSchema = new mongoose.Schema({
    crismando: {type: mongoose.Schema.Types.ObjectId, ref: "Crismando", required: true},
    status: {type: String, required: true, enum:["P", "FJ", "FNJ"]},
    dataPresenca: {type: Date, required: true},
    justificativa: {type: String, required: false},
})

const Frequencia = mongoose.model("Frequencia", frequenciaSchema);

export default Frequencia;