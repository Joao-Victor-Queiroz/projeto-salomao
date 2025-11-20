import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../services/api";
import { Grupo, GrupoCreate } from "@/types/crismando";
import { queryClient } from "@/lib/queryClient";
import { FrequenciaPost } from "@/types/crismando";
import { useAuth } from "@clerk/clerk-expo";

export function useGrupos() {
  return useQuery<Grupo[]>({
    queryKey: ["grupos"],
    queryFn: async () => {
      const response = await api.get("/grupos-crismandos");
      if (!response.data?.grupos || !Array.isArray(response.data.grupos)) {
        throw new Error("Dados inválidos ou não encontrados");
      }
      return response.data.grupos;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useUniqueGrupo(idGrupo: string) {
  return useQuery<Grupo>({
    queryKey: ["grupos", idGrupo],
    queryFn: async () => {
      const response = await api.get(`/grupos-crismandos/${idGrupo}`);
      if (!response.data) {
        throw new Error("Crismando não encontrado");
      }
      return response.data;
    },
    enabled: !!idGrupo,
  });
}

export const useCadastrarGrupo = () => {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (grupo: GrupoCreate) => {
      const token = await getToken();
      return await api.post("/grupos-crismandos", grupo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grupos"] });
    },
  });
};

export const useEditarGrupo = () => {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (grupo: Grupo) => {
      const token = await getToken();
      return await api.put(`/grupos-crismandos/${grupo._id!}`, grupo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["grupos", variables._id],
      });
      queryClient.invalidateQueries({ queryKey: ["grupos"] });
    },
  });
};

export const useAdicionarCrismandoAoGrupo = () => {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async ({
      idGrupo,
      idCrismando,
    }: {
      idGrupo: string;
      idCrismando: string;
    }) => {
      const token = await getToken();

      if (!idGrupo || !idCrismando) {
        throw new Error("ID do grupo ou do crismando não fornecido");
      }
      return await api.post(
        `/grupos-crismandos/${idGrupo}/adicionar-crismando/${idCrismando}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grupos"] });
      queryClient.invalidateQueries({ queryKey: ["crismandos-free"] });
    },
  });
};

export const useRemoverCrismandoDoGrupo = () => {
  return useMutation({
    mutationFn: async ({
      idGrupo,
      idCrismando,
    }: {
      idGrupo: string;
      idCrismando: string;
    }) => {

      if (!idGrupo || !idCrismando) {
        throw new Error("ID do grupo ou do crismando não fornecido");
      }
      return await api.post(
        `/grupos-crismandos/${idGrupo}/remover-crismando/${idCrismando}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grupos"] });
      queryClient.invalidateQueries({ queryKey: ["crismandos"] });
    },
  });
};

export const useRegistrarFrequencia = () => {
  return useMutation({
    mutationFn: async ({ frequencias }: { frequencias: FrequenciaPost[] }) => {
      if (!Array.isArray(frequencias) || frequencias.length === 0) {
        throw new Error("Frequências inválidas ou não fornecidas");
      }
      return await api.post(`/frequencia`, { frequencias });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grupos"] });
      queryClient.invalidateQueries({ queryKey: ["crismandos"] });
    },
  });
};

export const useRemoverGrupo = () => {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (idGrupo: string) => {
      const token = await getToken();

      if (!idGrupo) {
        throw new Error("ID do grupo não fornecido!");
      }

      return await api.delete(`grupos-crismandos/${idGrupo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grupos"] });
      queryClient.invalidateQueries({ queryKey: ["crismandos"] });
    },
  });
};

//Usando o Tanstack query, normalmente não é necessário usar try/catch, já que erros que acontecem na função de consulta (queryFn) são tratados automaticamente pelo Tanstack Query, sendo capturados e disponibilizados em isError e error.

// type ApiResponse = {
//   data: Grupo[];
// };

// const fetchGrupos = async (): Promise<ApiResponse> => {
//   try {
//     const response = await api.get("/grupos-crismandos");
//     if (!response.data) throw new Error("Erro ao carregar grupos");

//     if (!Array.isArray(response.data.grupos)) {
//       throw new Error("Resposta inválida: esperado um array de grupos");
//     }

//     console.log("Grupos:", response.data.grupos);
//     return {
//       data: response.data.grupos,
//     };
//   } catch (error) {
//     console.error("Erro ao buscar grupos:", error);
//     throw new Error("Erro ao carregar grupos");
//   }
// };

// // export function useGrupos() {
// //   return useQuery<ApiResponse>({
// //     queryKey: ["grupos"],
// //     queryFn: fetchGrupos,
// //     staleTime: 1000 * 60 * 5, //temp que os dados ficam "frescos", válidos
// //   });
// // }

// export function useGrupos() {
//   return useQuery<Grupo[]>({ // Change the generic type to Grupo[] directly
//     queryKey: ["grupos"],
//     queryFn: async () => {
//       const response = await fetchGrupos();
//       return response.data;
//     },
//     staleTime: 1000 * 60 * 5,
//   });
// }
