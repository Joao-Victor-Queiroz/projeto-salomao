import Caixinha from "../models/CaixinhaModel.js";
import Crismando from "../models/CrismandoModel.js";
import Frequencia from "../models/FrequenciaModel.js";
import Grupo from "../models/GrupoModel.js";
import { parse } from "date-fns";

// CADASTRO DE CRISMANDO
export const criarCrismando = async (req, res) => {
  try {
    const {
      nomeCrismando,
      rg,
      orgaoExpedidor,
      idade,
      dataNascimento,
      cidadeNascimento,
      estadoDaCidade,
      endereco,
      numEndereco,
      complemento,
      cidadeMoradia,
      bairro,
      cep,
      telefoneCrismando,
      nomePai,
      nomeMae,
      telefonePai,
      telefoneMae,
      batizado,
      primeiraEucaristia,
      justificativa,
    
    } = req.body;

    const dataNascimentoFormatada = parse(
      dataNascimento,
      "dd/MM/yyyy",
      new Date()
    );

    const novoCrismando = new Crismando({
      nomeCrismando,
      rg,
      orgaoExpedidor,
      idade,
      dataNascimento: dataNascimentoFormatada,
      cidadeNascimento,
      estadoDaCidade,
      endereco,
      numEndereco,
      complemento,
      cidadeMoradia,
      bairro,
      cep,
      telefoneCrismando,
      nomePai,
      nomeMae,
      telefonePai,
      telefoneMae,
      batizado,
      primeiraEucaristia,
      justificativa,
     
    });
    await novoCrismando.save();
    res.status(201).json(novoCrismando);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao criar o crismando", details: error.message });
  }
};

//EDITAR CRISMANDO
export const editarCrismando = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID não informado" });
    }

    const crismando = await Crismando.findById(id);

    if (!crismando) {
      return res.status(404).json({ message: "Crismando não encontrado" });
    }

    const {
      nomeCrismando,
      rg,
      orgaoExpedidor,
      idade,
      dataNascimento,
      cidadeNascimento,
      estadoDaCidade,
      endereco,
      numEndereco,
      complemento,
      cidadeMoradia,
      bairro,
      cep,
      telefoneCrismando,
      nomePai,
      nomeMae,
      telefonePai,
      telefoneMae,
      batizado,
      primeiraEucaristia,
      justificativa,
      ativo
    } = req.body;

    const dadosCrismandoAtualizados = {
      nomeCrismando,
      rg,
      orgaoExpedidor,
      idade,
      dataNascimento,
      cidadeNascimento,
      estadoDaCidade,
      endereco,
      numEndereco,
      complemento,
      cidadeMoradia,
      bairro,
      cep,
      telefoneCrismando,
      nomePai,
      nomeMae,
      telefonePai,
      telefoneMae,
      batizado,
      primeiraEucaristia,
      justificativa: justificativa || "",
      ativo
    };

    const dataNascimentoFormatada = parse(
      dataNascimento,
      "dd/MM/yyyy",
      new Date()
    );

    if (dataNascimentoFormatada) {
      dadosCrismandoAtualizados.dataNascimento = dataNascimentoFormatada;
    }

    const crismandoAtualizado = await Crismando.findByIdAndUpdate(
      id,
      dadosCrismandoAtualizados,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!crismandoAtualizado) {
      return res.status(404).json({ message: "Crismando não encontrado." });
    }

    res.status(200).json(crismandoAtualizado);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao editar o crismando", details: error.message });
  }
};

export const excluirCrismando = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID não informado" });
    }
    const crismando = await Crismando.findByIdAndDelete(id);

    if (!crismando) {
      return res
        .status(404)
        .json({ message: "Crismando não encontrado", details: error.message });
    }

    await Frequencia.deleteMany({ crismando: id });
    await Grupo.updateMany({ crismandos: id }, { $pull: { crismandos: id } });
    await Caixinha.deleteMany({crismando: id});

    res.status(200).json({ message: "Crismando excluído com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao excluir crismando" });
  }
};

// LISTAR CRISMANDOS
export const listarCrismandos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    if (page <= 0 || limit <= 0) {
      return res.status(400).json({ message: "Página ou limite inválido." });
    }

    const crismandos = await Crismando.find()
      .skip(skip)
      .limit(limit)
      .populate({
        path: "grupo",
        select: "nomeGrupo",
      })
      .populate("frequencia");
    const total = await Crismando.countDocuments();

    res.json({
      crismandos,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar crismandos" });
  }
};

//BUSCAR POR ID
export const buscarCrismandoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const crismando = await Crismando.findById(id)
      .populate("grupo", "nomeGrupo")
      .populate({
        path: "frequencia",
        options: { sort: { dataFrequencia: -1 } },
      })
      .populate({
        path: "caixinha",
        options: { sort: { dataPagamento: -1 } },
      });

    if (!crismando) {
      return res.status(404).json({ message: "crismando não encontrado" });
    }

    // const caixinhas = await Caixinha.find({crismando: id}).sort({dataPagamento: -1});

    res.status(201).json({ crismando });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Erro ao procurar crismando" });
  }
};

// BUSCA DE CRISMANDOS QUE NÃO TÊM GRUPO
export const crismandosLivres = async (req, res) => {
  try {
    const crismandosLivres = await Crismando.find({
      $or: [{ grupo: { $exists: false } }, { grupo: null }],
    });
    res.json(crismandosLivres);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Não foi possível carregar os crismandos livres" });
  }
};
