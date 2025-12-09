import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { useState, useEffect } from "react";
import MaskInput, { Masks } from "react-native-mask-input";
import { Feather } from "@expo/vector-icons";

import { Button } from "../../ui/Button";
import CrismandoFrequenciaRegister from "@/components/Frequencia/CrismandoFrequenciaRegister";
import { useUniqueGrupo } from "@/hooks/useGrupos";
import Loading from "@/components/Loading";

import { isValid, parse } from "date-fns";
import { styles } from "./styles";
import { Crismando, FrequenciaPost } from "@/types/crismando";
import { useRegistrarFrequencia } from "@/hooks/useGrupos";
import Toast from "react-native-toast-message";

import {z} from "zod"
import { useForm, useFieldArray, Controller} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatToBrazilianDate } from "@/lib/formatToBrazilianDate";

import MaskInputs from "@/components/Input/MaskInput";

const frequenciaSchema = z.object({
  dataPresenca: z.string().min(10, {message: "Informe uma data válida"}),
  frequencias: z.array(z.object({
    crismando: z.string(),
    status: z.enum(["P", "FJ", "FNJ"]),
    justificativa: z.string().optional(),
  }))
})

type FrequenciaSchemaType = z.infer<typeof frequenciaSchema>

type Props = {
  isVisible: boolean;
  onClose: () => void;
  idGrupo: string;
};

export default function RegistroFrequencia({isVisible, onClose, idGrupo}: Props){
   const {data, isLoading, refetch, isError, error} = useUniqueGrupo(idGrupo);
   const { mutate: registrarFrequenciaGrupo, isPending} = useRegistrarFrequencia();
   const {control, reset, handleSubmit} = useForm<FrequenciaSchemaType>({
    resolver: zodResolver(frequenciaSchema),
    defaultValues: {
      frequencias: []
    },
    
   })
   const {fields} = useFieldArray({
    control,
    name: "frequencias"
   })

   const onSubmit = (data: FrequenciaSchemaType) => {
    console.log(data);
   }

     const handleRegistrarFrequenciaGrupo = (data: FrequenciaSchemaType) => {
    if (!Array.isArray(data.frequencias) || data.frequencias.length === 0) {
      Toast.show({
        type: "error",
        text1: "Não foi possível registrar a frequência do grupo!",
      });
      return;
    }

    registrarFrequenciaGrupo(
      { dataPresenca: data.dataPresenca, frequencias: data.frequencias},
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Frequência registrada com sucesso!",
          });
          console.log("Dados enviado: ",data);
          onClose();
        },
        onError: (err: any) => {
          if (err.response) {
            console.log("Status:", err.response.status); 
            console.log("Headers:", err.response.headers); 
            console.log("Data do backend:", err.response.data);
          } else {
            console.log("Erro:", err.message);
          }
          Toast.show({
            type: "error",
            text1: "Houve um erro ao registrar a frequência!",
          });
          console.log(error);
        },
      }
    );
  };


  useEffect(() => {

      reset({
        dataPresenca: formatToBrazilianDate(new Date().toISOString()),
        frequencias: data?.crismandos?.map((crismando) => ({
          crismando: crismando._id!,
          status: "P",
          justificativa: ""
        }))
      })
  }, [data, reset])

  if (isLoading || isPending) {
    return <Loading isVisible={isLoading} />;
  }

    if (isError) {
    return (
      <Modal visible={isVisible} onRequestClose={onClose} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlayer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <Text style={styles.title}>Ocorreu um erro...</Text>
                <Text>{(error as Error).message}</Text>
                <Button onPress={() => refetch()}>
                  <Button.Title>Recarregar</Button.Title>
                </Button>
                <Button onPress={onClose}>
                  <Button.Title>Fechar</Button.Title>
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }


  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent animationType="slide">
          <View style={styles.modalContent}>
               <Feather
                name="x"
                color="gray"
                size={30}
                onPress={onClose}
                style={{ alignSelf: "flex-start" }}
                />
              <Text style={styles.title}>
                 Registrar Frequência do Grupo: {data?.nomeGrupo}
              </Text>
              <FlatList 
                data={fields}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => {
                  const crismandoAtual = data?.crismandos?.[index]

                  return (
                    <CrismandoFrequenciaRegister 
                    index={index}
                    control={control}
                    nomeCrismando={crismandoAtual?.nomeCrismando!}
                    />
                  )
                }}
                ListHeaderComponent={
                  <MaskInputs 
                  label="Data da Frequência"
                  control={control}
                  icon="calendar"
                  name="dataPresenca"
                  maskType="data"
                  disabled={false}
                  />
                }
                ListFooterComponent={
                  <Button onPress={handleSubmit(handleRegistrarFrequenciaGrupo)} style={{width: "100%", marginTop: 15}} disabled={isPending || isLoading}>
                    <Button.Title>Registrar Frequência</Button.Title>
                  </Button>
                }
                ListEmptyComponent={
                  () => <Text style={styles.emptyMessage}>Nenhum crismando encontrado no grupo.</Text>
                }
                contentContainerStyle={{paddingBottom: 68}}
                showsVerticalScrollIndicator={false}
              />
          </View>
    </Modal>
  )
}
