import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Caixinha, CaixinhaPost } from "@/types/crismando";
import {queryClient} from "@/lib/queryClient"


export function useRegistrarCaixinha(idCrismando: string){
    return useMutation({
        mutationFn: async (caixinha: CaixinhaPost) => {
            if(!caixinha.dataPagamento || !caixinha.valorPago){
                throw new Error ("Data de pagamento ou valor não informado(s)!")
            }

            return await api.post(`/caixinha/${idCrismando}`, caixinha)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["crismando", idCrismando]})
        }
    })
}

export function useUniqueCaixinha(idCaixinha: string | undefined){
    return useQuery<Caixinha>({
        queryKey: ["caixinha", idCaixinha ],
        queryFn: async () => {
            const response = await api.get(`/caixinha/${idCaixinha}`)
            return response.data;
        },
        enabled: !!idCaixinha
    })
}

export function useEditarCaixinha(idCaixinha: string){
    return useMutation({
        mutationFn: async (caixinha: CaixinhaPost) => {
            if(!idCaixinha){
                throw new Error("ID da caixinha não fornecido para edição")
            }
            const response = await api.put(`/caixinha/${idCaixinha}`, caixinha)
            return response.data;
        },
         onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["crismandos"]})
        }
    })
}