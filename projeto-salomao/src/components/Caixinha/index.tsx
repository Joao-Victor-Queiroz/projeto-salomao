import { Caixinha } from "@/types/crismando"
import { View, Text } from "react-native"
import { styles } from "./styles"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { caixinhaSchema, CaixinhaSchemaType } from "../CrismandoComponents/ModalCaixinhaRegistro";
import { formatToBrazilianDate } from "@/lib/formatToBrazilianDate";
import MaskInputs from "../Input/MaskInput";
import InputCurrency from "@/components/Input/CurrencyInput";
import { Button } from "../ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEditarCaixinha } from "@/hooks/useCaixinha";
import Toast from "react-native-toast-message";
import HeaderComponent from "../HeaderComponent";
import { router } from "expo-router";

type Props = {
    data: Caixinha
}

export default function CaixinhaPage({data} : Props){
    const {control, handleSubmit} = useForm<CaixinhaSchemaType>({
        resolver: zodResolver(caixinhaSchema),
        defaultValues: data ? {...data, dataPagamento: formatToBrazilianDate(data.dataPagamento)} : {}
    })

    const {mutate: editarCaixinha, isPending} = useEditarCaixinha(data._id)

    const onSubmit = (data: CaixinhaSchemaType) => {
        editarCaixinha(data, {
            onSuccess: () => {
                Toast.show({
                    type: 'success',
                    text1: 'Caixinha editada com sucesso!'
                })
                router.back()
            },
            onError: () => {
                Toast.show({
                    type: 'error',
                    text1: "Houve um erro ao editar a caixinha!"
                })
            }
        })
    }

    return(
        <SafeAreaView style={styles.container}>
          <HeaderComponent 
            onPressBack={() => router.back()}
            title="Edição de Caixinha"
          />
          <View >
            <MaskInputs 
            name="dataPagamento"
            label="Data do pagamento"
            control={control}
            icon="calendar"
            maskType="data"
            />
             <InputCurrency
            label="Valor Pago"
            control={control}
            icon="dollar-sign"
            name="valorPago"
            value={0}
            />

            <Button disabled={isPending} onPress={handleSubmit(onSubmit)} style={{width: "100%", marginTop: 10}}>
                <Button.Title>Editar</Button.Title>
            </Button>
          </View>
        </SafeAreaView>
    )
}