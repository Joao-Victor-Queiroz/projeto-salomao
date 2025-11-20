import mongoose from "mongoose";

const crismandoSchema = new mongoose.Schema({
  nomeCrismando: { type: String, required: true },
  rg: { type: String, required: true },
  orgaoExpedidor: { type: String, required: true },
  idade: { type: Number, required: true },
  dataNascimento: { type: Date, required: true },
  cidadeNascimento: { type: String, required: true },
  estadoDaCidade: { type: String, required: true },
  endereco: { type: String, required: true },
  numEndereco: { type: String, required: true },
  complemento: { type: String, required: false },
  cidadeMoradia: { type: String, required: true },
  bairro: { type: String, required: true },
  cep: { type: String, required: true },
  telefoneCrismando: {
    type: String,
    required: true,
    match: /^\(\d{2}\) \d{4,5}-\d{4}$/,
  },
  grupo: { type: mongoose.Schema.Types.ObjectId, ref: "Grupo", default: null, required: false},
  nomePai: { type: String, required: true },
  nomeMae: { type: String, required: true },
  telefonePai: {
    type: String,
    required: true,
    match: /^\(\d{2}\) \d{4,5}-\d{4}$/,
  },
  telefoneMae: {
    type: String,
    required: true,
    match: /^\(\d{2}\) \d{4,5}-\d{4}$/,
  },
  batizado: { type: String, required: true },
  primeiraEucaristia: { type: String, required: true },
  justificativa: { type: String, required: true },
  frequencia: [{ type: mongoose.Schema.Types.ObjectId, ref: "Frequencia" }],
  caixinha: [{ type: mongoose.Schema.Types.ObjectId, ref: "Caixinha" }],
  ativo: {type: Boolean, default: true}
});

const Crismando = mongoose.model("Crismando", crismandoSchema);

export default Crismando;
