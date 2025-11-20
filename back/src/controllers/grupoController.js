import Grupo from "../models/GrupoModel.js";

import Crismando from "../models/CrismandoModel.js";

export const criarGrupo = async (req, res) => {
  try {
    const { nomeGrupo } = req.body;

    const novoGrupo = new Grupo({ nomeGrupo });
    await novoGrupo.save();
    res.status(201).json(novoGrupo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

export const listarGrupos = async (req, res) => {
  try {
    const grupos = await Grupo.find();
    res.status(201).json({ grupos });
  } catch (error) {
    res.status(404).json({ message: "Erro ao buscar os grupos" });
  }
};

export const buscarGrupoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const grupo = await Grupo.findById(id).populate({
      path: "crismandos",
      populate: [
        {
          path: "frequencia",
          model: "Frequencia",
        },
        {
          path: "caixinha",
          model: "Caixinha"
        }
      ]
    });

    if (!grupo) {
      return res.status(404).json({ message: "Grupo não encontrado" });
    }
    return res.status(201).json(grupo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar o grupo" });
  }
};

export const editarGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const grupo = await Grupo.findById(id);

    if (!grupo) {
      return res.status(404).json({ message: "Grupo não encontrado" });
    }
    const grupoDadosAtualizados = req.body;

    const grupoAtualizado = await Grupo.findByIdAndUpdate(
      id,
      grupoDadosAtualizados,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(201).json(grupoAtualizado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao editar o grupo" });
  }
};

export const excluirGrupo = async (req, res) => {
  try {
    const { idGrupo } = req.params;

    if (!idGrupo) {
      console.log("Id não informado");
      return res.status(400).json({ message: "ID não informado!" });
    }

    const grupo = await Grupo.findByIdAndDelete(idGrupo);

    if (!grupo) {
      console.log("Grupo não encontrado");
      return res.status(404).json({ message: "Grupo não encontrado" });
    }

    await Crismando.updateMany({ grupo: idGrupo }, { $unset: { grupo: "" } });
    return res
      .status(200)
      .json({ message: "Grupo excluído com sucesso e crimandos atualizados" });
  } catch (error) {
    console.log("Erro ao excluir o grupo", error);
    res.status(500).json({ message: "Erro ao excluir grupo" });
  }
};

export const adicionarCrismandoAoGrupo = async (req, res) => {
  try {
    const { idCrismando, idGrupo } = req.params;

    const grupo = await Grupo.findById(idGrupo);

    if (!grupo) {
      return res.status(404).json({ message: "O grupo não foi encontrado" });
    }

    const crismando = await Crismando.findById(idCrismando);
    if (!crismando) {
      return res
        .status(404)
        .json({ message: "O crismando não foi encontrado" });
    }

    if (crismando.grupo?.toString() === idGrupo) {
      return res
        .status(400)
        .json({ message: "Esse crismando já está nesse grupo" });
    }

    if (
      crismando.grupo?.toString() &&
      crismando.grupo?.toString() !== idGrupo
    ) {
      return res
        .status(400)
        .json({ message: "Esse crismando já está em outro grupo." });
    }

    if (!grupo.crismandos.includes(crismando._id)) {
      grupo.crismandos.push(crismando._id);
      await grupo.save();
    }

    crismando.grupo = idGrupo;
    await crismando.save();

    res
      .status(200)
      .json({ message: "Crismando adicionado com sucesso", crismando });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar crismando" });
  }
};

export const removerCrismandoDoGrupo = async (req, res) => {
  try {
    const { idCrismando, idGrupo } = req.params;

    const grupo = await Grupo.findById(idGrupo);
    if (!grupo) {
      return res.status(404).json({ message: "O grupo não foi encontrado" });
    }

    const crismando = await Crismando.findById(idCrismando);
    if (!crismando) {
      return res
        .status(404)
        .json({ message: "O crismando não foi encontrado" });
    }

    if (crismando.grupo?.toString() !== idGrupo) {
      return res
        .status(400)
        .json({ message: "Esse crismando não está nesse grupo." });
    }

    await Grupo.findByIdAndUpdate(idGrupo, {
      $pull: { crismandos: idCrismando },
    });

    await Crismando.findByIdAndUpdate(idCrismando, {
      $set: { grupo: null },
    });

    // grupo.crismandos = grupo.crismandos.filter(
    //   (c) => c.toString() !== idCrismando
    // );
    // await grupo.save();

    // crismando.grupo = null;
    // await crismando.save();

    res
      .status(200)
      .json({ message: "Crismando adicionado com sucesso", crismando });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar crismando" });
  }
};
