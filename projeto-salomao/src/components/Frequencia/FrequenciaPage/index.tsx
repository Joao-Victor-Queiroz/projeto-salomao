import { Frequencia } from "@/types/crismando"
import { View, Text, Pressable } from "react-native"
import { styles } from "./styles"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEditarFrequencia } from "@/hooks/useCrismandos";
import { formatToBrazilianDate } from "@/lib/formatToBrazilianDate";
import MaskInputs from "@/components/Input/MaskInput";
import { Button } from "@/components/ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import HeaderComponent from "@/components/HeaderComponent";
import { router } from "expo-router";
import { useEffect } from "react";

import { z } from "zod";
import Loading from "@/components/Loading";
import Input from "@/components/Input";


const frequenciaSchema = z.object({
    status: z.string(),
    dataPresenca: z.string().min(4, {message: "Insira uma data válida"}),
    justificativa: z.string().optional()
})

type FrequenciaSchemaType = z.infer<typeof frequenciaSchema>

type Props = {
    dataFrequencia: Frequencia
}


export default function FrequenciaPage({dataFrequencia} : Props){
    const {control, handleSubmit, watch, setValue, reset} = useForm<FrequenciaSchemaType>({
        resolver: zodResolver(frequenciaSchema),
        defaultValues: dataFrequencia ? {...dataFrequencia, dataPresenca: dataFrequencia?.dataPresenca 
                    ? formatToBrazilianDate(dataFrequencia.dataPresenca) 
                    : "",
                status: dataFrequencia.status ? dataFrequencia.status : "P"} : {}
    })


    const {mutate: editarFrequencia, isPending, isError} = useEditarFrequencia(dataFrequencia._id)
    
    const options = [
    { label: "Presente", value: "P" },
    { label: "Falta Justificada", value: "FJ" },
    { label: "Falta Não Justificada", value: "FNJ" },
  ];

  const status = watch("status");

    const onSubmit = (data: FrequenciaSchemaType) => {
      editarFrequencia(data, {
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Frequência editada com sucesso'
            })
        },
        onError: () => {
            Toast.show({
                type: 'error',
                text1: 'Erro ao editar frequência'
            })
        },
        onSettled: () => {
            router.replace(`/(auth)/crismandos`)
        }
      });
    }

    if(isPending){
        return <Loading isVisible={isPending}/>
    }

    return(
        <SafeAreaView style={styles.container}>
          <HeaderComponent 
            onPressBack={() => router.back()}
            title="Edição de Frequência"
          />
          <View>
            <MaskInputs 
            name="dataPresenca"
            label="Data da Frequência"
            control={control}
            icon="calendar"
            maskType="data"
            />
            <View style={styles.statusOptions}>
                {options.map((option) => {
                    const isSelected = status === option.value

                    return(
                        <Pressable 
                        key={option.value} 
                        onPress={() => setValue("status", option.value)} 
                        style={isSelected ? styles.selectedStatusButton : styles.statusButton}>
                            <Text  style={
                            isSelected ? styles.buttonTextSelected : styles.buttonText
                            }>
                                {option.label}
                            </Text>
                        </Pressable>
                    )
                })}
            </View>
            {status === "FJ" &&   

            <Input 
            name="justificativa"
            control={control}
            icon="check-circle"
            inputProps={{placeholder: "Digite a justificativa..."}}
            label="Justificativa"
            />
            }

            <Button disabled={isPending} onPress={handleSubmit(onSubmit)} style={{width: "100%", marginTop: 10}}>
                <Button.Title>Editar</Button.Title>
            </Button>
          </View>
        </SafeAreaView>
    )
}