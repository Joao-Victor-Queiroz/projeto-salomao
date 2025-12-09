import Crismando from "../models/CrismandoModel.js";
import Frequencia from "../models/FrequenciaModel.js";
import { parse } from "date-fns";

export const registrarFrequencia = async (req, res) => {
  try {
    const { dataPresenca: dataRegistrada, frequencias } = req.body;

    if (!Array.isArray(frequencias) || frequencias.length === 0) {
      return res.status(400).json({ message: "Nenhuma frequência registrada" });
    }
    const frequenciasFormatadas = frequencias.map((item) => ({
      crismando: item.crismando,
      status: item.status,
      dataPresenca: parse(dataRegistrada, "dd/MM/yyyy", new Date()),
      justificativa: item.justificativa || null,
    }));

    const frequenciasRegistradas = await Frequencia.insertMany(
      frequenciasFormatadas
    );

    for (const freq of frequenciasRegistradas) {
      await Crismando.findByIdAndUpdate(freq.crismando, {
        $push: { frequencia: freq._id },
      });
    }

    res.status(201).json({
      message: "Frequências registradas com sucesso!",
      frequenciasRegistradas,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao registrar frequências",
      details: error.message,
    });
  }
};

export const buscarFrequenciaPorId = async (req, res) => {
    try {
      const { id } = req.params;

      if(!id){
        return res.status(400).json({message: "ID não informado!"})
      }

      const frequencia = await  Frequencia.findById(id);

      if(!frequencia){
        return res.status(404).json({message: "Frequência não encontrada!"})
      }

      return res.status(200).json(frequencia)

    } catch (error) {
      console.error(error)
      res.status(500).json({message: "Erro ao buscar frequência!"})
    }
}

export const editarFrequencia = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID não informado" });
    }

    const frequencia = await Frequencia.findById(id);


    if (!frequencia) {
      return res.status(404).json({ message: "Frequência não encontrada" });
    }

   
    const { status, dataPresenca, justificativa } = req.body;
    if (!status || !dataPresenca) {
      return res
        .status(400)
        .json({ message: "Status e data de presença são obrigatórios." });
    }
    const dadosFrequenciaAtualizados = {
      status,
      dataPresenca: parse(dataPresenca, "dd/MM/yyyy", new Date()),
      justificativa: justificativa || "",
    };

    const frequenciaAtualizada = await Frequencia.findByIdAndUpdate(
      id,
      dadosFrequenciaAtualizados,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Frequência editada com sucesso!",
      frequenciaAtualizada,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao editar frequência", details: error.message });
  }
};
