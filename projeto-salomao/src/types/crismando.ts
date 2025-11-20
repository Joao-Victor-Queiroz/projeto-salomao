export type Crismando = {
  _id?: string;
  nomeCrismando: string;
  rg: string;
  orgaoExpedidor: string;
  idade: number;
  dataNascimento: string;
  cidadeNascimento: string;
  estadoDaCidade: string;
  endereco: string;
  numEndereco: number;
  complemento?: string;
  cidadeMoradia: string;
  bairro: string;
  cep: string;
  telefoneCrismando: string;
  nomePai: string;
  nomeMae: string;
  telefonePai: string;
  telefoneMae: string;
  batizado: string;
  primeiraEucaristia: string;
  justificativa?: string;

  grupo?: {
    nomeGrupo: string;
  };
  frequencia?: Frequencia[];
  caixinha?: Caixinha[];
  ativo: boolean;
};

export type CrismandoPost = {
  nomeCrismando: string;
  rg: string;
  orgaoExpedidor: string;
  idade: number;
  dataNascimento: string;
  cidadeNascimento: string;
  estadoDaCidade: string;
  endereco: string;
  numEndereco: number;
  complemento?: string;
  cidadeMoradia: string;
  bairro: string;
  cep: string;
  telefoneCrismando: string;
  nomePai: string;
  nomeMae: string;
  telefonePai: string;
  telefoneMae: string;
  batizado: string;
  primeiraEucaristia: string;
  justificativa?: string;
};

export type Frequencia = FrequenciaPost & {
  _id: string;
};

export type FrequenciaPost = {
  crismando: string;
  status: string;
  dataPresenca: string;
  justificativa: string | undefined;
};

export type FrequenciaEdit = {
  status: string;
  dataPresenca: string;
  justificativa?: string | undefined;
}

export type CaixinhaPost = {
  valorPago: number;
  dataPagamento: string;
};

export type Caixinha = CaixinhaPost & {
  _id: string;
  crismando: string;
};

export type Grupo = {
  _id?: string;
  nomeGrupo: string;
  crismandos?: Crismando[] | undefined;
};

export type GrupoCreate = Omit<Grupo, "_id" | "crismandos">;
