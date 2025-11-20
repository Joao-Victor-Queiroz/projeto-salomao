import { z } from "zod";

export const animadorSchema = z.object({
  nomeAnimador: z.string().min(2, "Informe um nome válido"),
  emailAnimador: z.string().email({message: "Informe um email válido"}),
  grupo: z.any().refine((value) => value !== "", {
    message: "Informe se o crismando fez primeira eucaristia",
  }),
});
