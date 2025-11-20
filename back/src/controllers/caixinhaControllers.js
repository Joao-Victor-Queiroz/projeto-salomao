import Caixinha from "../models/CaixinhaModel.js";
import Crismando from "../models/CrismandoModel.js";
import { parse } from 'date-fns';

//REGISTRO DE CAIXINHA

export const criarCaixinha = async (req, res) => {
  try {
    const { idCrismando } = req.params;
    const { valorPago, dataPagamento } = req.body;

    if (!idCrismando) {
      return res.status(400).json({ message: "ID não informado" });
    }

    if (typeof valorPago !== "number" || valorPago <= 0) {
      return res.status(400).json({ message: "Valor pago inválido." });
    }

    if (!dataPagamento || isNaN(new Date(dataPagamento))) {
      return res
        .status(400)
        .json({ message: "Data do pagamento é obrigatória." });
    }

    const dataPagamentoFormatada= parse(dataPagamento, "dd/MM/yyyy", new Date())

    const crismandoExiste = await Crismando.findById(idCrismando);
    if (!crismandoExiste) {
      return res.status(404).json({ message: "Crismando não encontrado" });
    }

    const registroCaixinha = new Caixinha({
      crismando: idCrismando,
      valorPago: valorPago,
      dataPagamento:dataPagamentoFormatada,
    });

    await registroCaixinha.save();

    await Crismando.findByIdAndUpdate(idCrismando, {
      $push: { caixinha: registroCaixinha._id },
    });

    res
      .status(201)
      .json({ message: "Caixinha registrada com sucesso!", registroCaixinha });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao registrar caixinha", details: error.message });
  }
};

export const buscarCaixinhaPorId = async(req, res) => {
    try{
      const {id} = req.params

      if(!id){
        return res.status(400).json({message: "ID não informado"})
      }

      const caixinha = await Caixinha.findById(id);

      if(!caixinha){
        return res.status(404).json({message: "Caixinha não encontrada!"})
      }

      return res.status(200).json(caixinha)
    }catch(error){
return res
      .status(500)
      .json({ message: "Erro ao editar caixinha", details: error.message });
    }
}

export const editarCaixinha = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID não informado" });
    }
    const caixinha = await Caixinha.findById(id);

    if (!caixinha) {
      res.status(404).json({ message: "Caixinha não encontrada" });
    }

    const {valorPago, dataPagamento}= req.body;

    const dadosCaixinhaAtualizados ={
      valorPago: valorPago || caixinha.valorPago,
      dataPagamento: dataPagamento ? parse(dataPagamento, "dd/MM/yyyy", new Date()) : caixinha.dataPagamento,
    }

    const caixinhaAtualizada = await Caixinha.findByIdAndUpdate(
      id,
      dadosCaixinhaAtualizados,
      {
        new: true,
        runValidators: true,
      }
    );

    res
      .status(201)
      .json({ message: "Caixinha editada com sucesso!", caixinhaAtualizada });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao editar caixinha", details: error.message });
  }
};
