import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button } from "../../ui/Button";
import Loading from "@/components/Loading";
import { styles } from "./styles";
import InputCurrency from "@/components/Input/CurrencyInput";
import MaskInputs from "@/components/Input/MaskInput";
import Toast from "react-native-toast-message";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegistrarCaixinha } from "@/hooks/useCaixinha";

import { Feather } from "@expo/vector-icons";


export const caixinhaSchema = z.object({
  dataPagamento: z.string(),
  valorPago: z.coerce.number({ message: "Insira um valor válido" }),
});

export type CaixinhaSchemaType = z.infer<typeof caixinhaSchema>;



type Props = {
  isVisible: boolean;
  onClose: () => void;
  idCrismando: string;

};

export default function ModalCaixinhaRegistro({
  isVisible,
  onClose,
  idCrismando,
}: Props) {
  const { control, handleSubmit } = useForm<CaixinhaSchemaType>({
    resolver: zodResolver(caixinhaSchema),
    mode: "onChange",
    criteriaMode: "all",
  });

  const {
    mutate: registrarCaixinha,
    isPending,
  } = useRegistrarCaixinha(idCrismando);

  const onSubmit = async (data: CaixinhaSchemaType) => {
    
      registrarCaixinha(data, {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Caixinha registrada com sucesso!",
            text2: "O registro foi salvo.",
          });
          console.log(data);
          onClose();
        },
        onError: (err: any) => {
          Toast.show({
            type: "error",
            text1: "Houve um erro ao registrar a caixinha!",
          });
          onClose();
          console.log(err.status);
          console.log(err);
        },
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
      
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <Feather
                name="x"
                color="gray"
                size={34}
                onPress={onClose}
                style={{ alignSelf: "flex-start" }}
              />
              <Text style={styles.title}>Registrar Caixinha</Text>
              {isPending ? (
                <Loading isVisible={isPending} />
              ) : (
                <>
                  <MaskInputs
                    label="Data do pagamento"
                    control={control}
                    icon="calendar"
                    name="dataPagamento"
                    maskType="data"
                  />
                  <InputCurrency
                    label="Valor Pago"
                    control={control}
                    icon="dollar-sign"
                    name="valorPago"
                    value={0}
                  />
                  {/* <Input
                    label="Valor pago"
                    control={control}
                    icon="dollar-sign"
                    name="valorPago"
                    inputProps={{ placeholder: "Digite o valor pago" }}
                  /> */}
                  <Button
                    onPress={handleSubmit(onSubmit)}
                    style={{ width: "100%" }}
                  >
                    <Button.Title>Registrar</Button.Title>
                  </Button>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>

      </TouchableWithoutFeedback>
    </Modal>
    </TouchableWithoutFeedback>
  );
}
