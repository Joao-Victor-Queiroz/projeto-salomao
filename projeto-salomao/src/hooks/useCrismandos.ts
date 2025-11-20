import { useInfiniteQuery, useQuery, useMutation } from "@tanstack/react-query";
import { api } from "../services/api";
import { Crismando, CrismandoPost, Frequencia, FrequenciaEdit, FrequenciaPost } from "@/types/crismando";
import { queryClient } from "@/lib/queryClient";

type ApiResponse = {
  data: Crismando[];
  totalPages: number;
};

const PAGE_SIZE = 20;

const fetchCrismandos = async ({ pageParam = 1 }): Promise<ApiResponse> => {
  const response = await api.get(
    `/crismandos?page=${pageParam}&limit=${PAGE_SIZE}`
  );
  if (!response.data) throw new Error("Erro ao carregar crismandos");
  // return response.json(); -> próprio do fetch nativo do JS
  console.log("Crismandos:", response.data);
  return {
    data: response.data.crismandos,
    totalPages: response.data.totalPages,
  };
};

export function useCrismandos() {
  return useInfiniteQuery({
    queryKey: ["crismandos"],
    queryFn: fetchCrismandos,
    getNextPageParam: (lastPage, pages) => {
      const proximaPagina = pages.length + 1;
      return proximaPagina <= lastPage.totalPages ? proximaPagina : undefined;
    },
    initialPageParam: 1,
  });
}

export function useAllFreeCrismandos() {
  return useQuery<Crismando[]>({
    queryKey: ["crismandos-free"],
    queryFn: async () => {
      const response = await api.get("/crismandos/crismandos-livres");

      if (!response.data! || !Array.isArray(response.data)) {
        throw new Error("Crismandos não encontrados!");
      }
      return response.data;
    },
  });
}

export function useUniqueCrismando(idCrismando: string) {
  return useQuery<Crismando>({
    queryKey: ["crismandos", idCrismando],
    queryFn: async () => {
      const response = await api.get(`/crismandos/${idCrismando}`);

      if (!response.data?.crismando) {
        throw new Error("Crismando não encontrado");
      }

      return response.data?.crismando;
    },
    enabled: !!idCrismando,
  });
}

export function useRegistrarCrismando() {
  return useMutation({
    mutationFn: async (crismando: CrismandoPost) => {
      return await api.post("/crismandos", crismando);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crismandos"] });
    },
  });
}

export function useEditarCrismando() {
  return useMutation({
    mutationFn: async (crismando: Crismando) => {
      return await api.put(`/crismandos/${crismando._id!}`, crismando);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["crismandos", variables._id],
      });
      queryClient.invalidateQueries({ queryKey: ["crismandos"] }); 
    },
  });
}


export function useExcluirCrismando() {
  return useMutation({
    mutationFn: async (idCrismando: string) => {
      return await api.delete(`/crismandos/${idCrismando}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["crismandos"],
      });
      queryClient.invalidateQueries({ queryKey: ["crismandos"] }); 
    },
  });
}

export function useUniqueFrequencia(idFrequencia: string | undefined){
  return useQuery<Frequencia>({
    queryKey:["frequencia", idFrequencia],
    queryFn: async () => {
      const response = await api.get(`/frequencia/${idFrequencia}`);
      return response.data;
    },
    enabled: !!idFrequencia //impede da consulta ser feita se o idFrequencia for undefined
  })
}

export const useRegistrarFrequenciaCrismando = () => {
  return useMutation({
    mutationFn: async ({ frequencias }: { frequencias: FrequenciaPost }) => {
      return await api.post(`/frequencia`, { frequencias });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grupos"] });
      queryClient.invalidateQueries({ queryKey: ["crismandos"] });
    },
  });
};

export function useEditarFrequencia(idFrequencia : string){
  return useMutation({
    mutationFn: async (frequencia: FrequenciaEdit) => {
      const response = await api.put(`/frequencia/${idFrequencia}`, frequencia);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["frequencia", idFrequencia]});
      queryClient.invalidateQueries({queryKey: ["crismandos"]});
    }
  })
}
