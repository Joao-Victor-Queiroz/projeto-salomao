import mongoose from "mongoose";


const grupoSchema = new mongoose.Schema({
    nomeGrupo: {type: String, required: true},
    crismandos: [{type: mongoose.Schema.Types.ObjectId, ref: "Crismando"}]
})

const Grupo = mongoose.model("Grupo", grupoSchema);

export default Grupo;