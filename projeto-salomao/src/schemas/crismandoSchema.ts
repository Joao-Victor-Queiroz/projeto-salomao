import { z } from "zod";

export const crismandoSchema = z.object({
  //Dados pessoais
  nomeCrismando: z.string().min(2, { message: "Informe um nome válido" }),
  rg: z.string().min(1, { message: "Informe o número do RG" }),
  orgaoExpedidor: z.string().min(1, "Informe o Órgão Emissor do RG"),
  idade: z.coerce.number({ message: "Informe um número válido" }),
  dataNascimento: z
    .string(),
  cidadeNascimento: z.string().min(2, "Insira uma cidade válida"),
  estadoDaCidade: z.string().length(2, "Informe a UF da cidade"),
  endereco: z.string().min(2, { message: "Informe o endereço" }),
  numEndereco: z.coerce.number({ message: "Informe o número do endereço" }),
  complemento: z.string().optional(),
  cidadeMoradia: z.string().min(2, "Informe a cidade onde mora"),
  bairro: z.string().min(2, "Informe o bairro"),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "Insira um CEP válido"),
  telefoneCrismando: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Insira um celular válido"),

  //Filiação
  nomePai: z.string().min(2, "Informe o nome do pai"),
  nomeMae: z.string().min(2, "Informe o nome da mãe"),
  telefonePai: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Insira um celular válido"),
  telefoneMae: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Insira um celular válido"),

  //Dados do cristão
  batizado: z.string().refine((value) => value !== null, {
    message: "Informe se o crismando foi batizado",
  }),

  primeiraEucaristia: z.string().refine((value) => value !== null, {
    message: "Informe se o crismando foi batizado",
  }),
  justificativa: z.string().optional(),
  ativo: z.boolean().optional()
});

export type CrismandoSchemaType = z.infer<typeof crismandoSchema>;
