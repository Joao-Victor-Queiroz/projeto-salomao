import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  ScrollView,
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

type Props = {
  isVisible: boolean;
  onClose: () => void;
  idGrupo: string;
};

export default function RegistroFrequencia({
  isVisible,
  onClose,
  idGrupo,
}: Props) {
  const { data, isLoading, refetch, isError, error } = useUniqueGrupo(idGrupo);

  const { mutate: registrarFrequenciaGrupo, isPending } =
    useRegistrarFrequencia();

  const [frequencias, setFrequencias] = useState<FrequenciaPost[]>([]);
  const [dataFrequencia, setDataFrequencia] = useState<string>("");

  useEffect(() => {
    if (data?.crismandos) {
      const frequenciasIniciais: FrequenciaPost[] = data.crismandos.map(
        (crismando) => ({
          crismando: crismando._id!,
          status: "P",
          dataPresenca: dataFrequencia,
          justificativa: "",
        })
      );
      setFrequencias(frequenciasIniciais);
    }
  }, [data, dataFrequencia]);

  const handleJustificativaChange = (crismandoId: string, text: string) => {
    setFrequencias((prevFrequencias) =>
      prevFrequencias.map((frequencia) =>
        frequencia.crismando === crismandoId ? { ...frequencia, justificativa: text } : frequencia
      )
    );
  };

  const handleStatusChange = (crismandoId: string, status: string) => {
    setFrequencias((prevFrequencias) =>
      prevFrequencias.map((frequencia) =>
       frequencia.crismando === crismandoId ? { ...frequencia, status: status } : frequencia
      )
    );
  };

  const handleRegistrarFrequenciaGrupo = () => {
    if (!Array.isArray(frequencias) || frequencias.length === 0) {
      Toast.show({
        type: "error",
        text1: "Não foi possível registrar a frequência do grupo!",
      });
      return;
    }

    const dataConvertida = parse(dataFrequencia, "dd/MM/yyyy", new Date());

    if (!isValid(dataConvertida)) {
      Toast.show({
        type: "error",
        text1: "Data inválida!",
      });
      return;
    }

    registrarFrequenciaGrupo(
      { frequencias },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Frequência registrada com sucesso!",
          });
          console.log(frequencias);
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

              {data?.crismandos?.length === 0 ? (
                <Text>Nenhum crismando registrado no grupo.</Text>
              ) : (
                <FlatList
                  data={data?.crismandos as Crismando[]}
                  keyExtractor={(item) => item._id!}
                  renderItem={({ item }) => (
                    <CrismandoFrequenciaRegister
                      data={item}
                      selectedStatus={
                        frequencias.find((f) => f.crismando === item._id)
                          ?.status as string
                      }
                      onChangeStatus={(status) =>
                        handleStatusChange(item._id!, status)
                      }
                      onChangeJustificativa={(text) =>
                        handleJustificativaChange(item._id!, text)
                      }
                      justificativa={
                        frequencias.find((f) => f.crismando === item._id)
                          ?.justificativa as string || ""
                      }
                    />
                  )}
                  contentContainerStyle={{ paddingVertical: 15, gap: 6}}
                  ListHeaderComponent={
                    <View style={styles.inputContainer}>
                      <Text style={styles.labelInput}>Data da Frequência:</Text>
                      <View style={styles.dataInput}>
                        <View style={styles.inputIcon}>
                          <Feather name="calendar" size={24} color="black" />
                        </View>
                        <MaskInput
                          onChangeText={setDataFrequencia}
                          value={dataFrequencia}
                          mask={Masks.DATE_DDMMYYYY}
                          style={styles.input}
                        />
                      </View>
                    </View>
                  }
                  // ListFooterComponent={
                  //   <Button
                  //     onPress={handleRegistrarFrequenciaGrupo}
                  //     style={{ width: "100%", marginTop: 10 }}
                  //     disabled={isPending}
                  //   >
                  //     <Button.Title>Registrar Frequência</Button.Title>
                  //   </Button>
                  // }
                  showsVerticalScrollIndicator={false}
                />
              )}

              <Button
                onPress={handleRegistrarFrequenciaGrupo}
                style={{ width: "100%", marginTop: 10 }}
                disabled={isPending}
              >
                <Button.Title>Registrar Frequência</Button.Title>
              </Button>
              {/* <Button
                onPress={onClose}
                style={{ width: "100%", marginTop: 10 }}
              >
                <Button.Title>Fechar</Button.Title>
              </Button> */}
            </View>

    </Modal>
  );
}
