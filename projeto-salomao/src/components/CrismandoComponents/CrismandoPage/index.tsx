import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { Crismando } from "@/types/crismando";
import { formatToBrazilianDate } from "@/lib/formatToBrazilianDate";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/Button";
import FaltasDropdown from "@/components/Frequencia/FrequenciaDropDown";
import ModalCaixinhaRegistro from "../ModalCaixinhaRegistro";
import FrequenciaCrismando from "../FrequenciaCrismando";
import CrismandoCaixinhasList from "../CaixinhasList";
import HeaderComponent from "@/components/HeaderComponent";
import ModalConfirmacao from "@/components/ModalRemoverConfirmacao";

import { formatToBrazilianCurrency } from "@/lib/formatToBrazilianCurrency";
import { styles } from "./styles";
import { fontFamily, colors } from "@/styles/theme";

import { useExcluirCrismando } from "@/hooks/useCrismandos";
import Toast from "react-native-toast-message";

type Props = {
  data: Crismando;
  isLoading: boolean;
};

export default function CrismandoPage({ data, isLoading }: Props) {
  if (isLoading) return <Loading isVisible={isLoading} />;

  const nomeGrupoCrismando = data?.grupo?.nomeGrupo || "Sem grupo";
  const faltas = data?.frequencia?.filter(
    (f) => f.status === "FJ" || f.status === "FNJ"
  );

  const [modalFrequenciaVisible, setModalFrequenciaVisible] = useState(false);
  const [modalCaixinhaVisible, setModalCaixinhaVisible] = useState(false);
  const [modalCrismandoCaixinhasVisible, setModalCrismandoCaixinhasVisible] = useState(false);
  const [modalConfirmacaoVisible, setModalConfirmacaoVisible] = useState(false);

  const {mutate: excluirCrismando, isPending} = useExcluirCrismando()

  const router = useRouter();

  const totalPagoCaixinhaCrismando = data?.caixinha?.reduce((acc, caixinha) => acc + caixinha.valorPago, 0)

  const handleRemoverCrismando = (idCrismando: string) => {
    if(!idCrismando){
      return;
    }

    excluirCrismando(idCrismando, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Crismando excluído com sucesso!"
        })
        router.replace("/(auth)/crismandos")
        setModalConfirmacaoVisible(false)
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Erro ao excluir crismando!"
        })
        setModalConfirmacaoVisible(false)
      }
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 64 }}>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <HeaderComponent
            title={data?.nomeCrismando}
            onPressBack={() => router.back()}
          />
          <View>
            <View>
              <Text style={styles.basicInfo}>Idade: {data?.idade}</Text>
              <Text style={styles.basicInfo}>Grupo: {nomeGrupoCrismando}</Text>
              <Text style={styles.basicInfo}>
                Data de nascimento:
                {formatToBrazilianDate(data?.dataNascimento)}
              </Text>
              <Text style={styles.basicInfo}>Batizado: {data?.batizado}</Text>
              <Text style={styles.basicInfo}>
                Primeira Eucaristia: {data?.primeiraEucaristia}
              </Text>
              
            </View>
          
            <View style={styles.actions}>
              <Text style={styles.actionsText}>Ações</Text>
              <Button
                style={{ width: "45%" }}
                onPress={() => router.push(`/crismando/${data._id!}/edit`)}
              >
                <Button.Title>
                  Editar <Feather name="edit-2" size={16} color="white" />
                </Button.Title>
              </Button>
            </View>
          </View>
          <View style={styles.crismandoActions}>
             <Button
              style={styles.crismandoActionButton}
              onPress={() => setModalCrismandoCaixinhasVisible(true)}
            >
              <Button.Title isBlackText>
                Total Pago: {formatToBrazilianCurrency(totalPagoCaixinhaCrismando!)}
                <Feather />
              </Button.Title>
            </Button>
            <Button
              style={styles.crismandoActionButton}
              onPress={() => setModalFrequenciaVisible(true)}
            >
              <Button.Title isBlackText>
                Ver Frequência completa
                <Feather />
              </Button.Title>
            </Button>
            <Button
              style={styles.crismandoActionButton}
              onPress={() => setModalCaixinhaVisible(true)}
            >
              <Button.Title isBlackText>
                Registrar Caixinha
               
              </Button.Title>
            </Button>
          </View>
          <FaltasDropdown faltas={faltas!} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados Pessoais</Text>
            <View style={styles.sectionContent}>
              <View style={styles.sectionInfo}>
                <Text style={styles.infoTitle}>RG: </Text>
                <Text style={styles.infoContent}>{data?.rg}</Text>
              </View>
              <View style={styles.sectionInfo}>
                <Text style={styles.infoTitle}>Órgão Expedidor: </Text>
                <Text style={styles.infoContent}>{data?.orgaoExpedidor}</Text>
              </View>
              <View style={styles.sectionInfo}>
                <Text style={styles.infoTitle}>Cidade de Moradia: </Text>
                <Text style={styles.infoContent}>{data?.cidadeMoradia}</Text>
              </View>
              <View style={styles.sectionInfo}>
                <Text style={styles.infoTitle}>Bairro: </Text>
                <Text style={styles.infoContent}>{data?.bairro}</Text>
              </View>
              <View style={styles.sectionInfo}>
                <Text style={styles.infoTitle}>Endereço: </Text>
                <Text style={styles.infoContent}>{data?.endereco}</Text>
              </View>
              <View style={styles.sectionInfo}>
                <Text style={styles.infoTitle}>CEP: </Text>
                <Text style={styles.infoContent}>{data?.cep}</Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados dos Pais</Text>
            <View style={styles.sectionContent}>
              <View style={styles.sectionInfo}>
                <Text style={styles.infoTitle}>Nome da Mãe: </Text>
                <Text style={styles.infoContent}>{data?.nomeMae}</Text>
              </View>
              <View style={styles.sectionInfo}>
                <Text style={styles.infoTitle}>Telefone da Mãe: </Text>
                <Text style={styles.infoContent}>{data?.telefoneMae}</Text>
              </View>
              <View style={styles.sectionInfo}>
                <Text style={styles.infoTitle}>Nome do Pai: </Text>
                <Text style={styles.infoContent}>{data?.nomePai}</Text>
              </View>
              <View style={styles.sectionInfo}>
                <Text style={styles.infoTitle}>Telefone do Pai: </Text>
                <Text style={styles.infoContent}>{data?.telefonePai}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.removerButton} onPress={() => setModalConfirmacaoVisible(true)}>
            <Text style={styles.removerButtonText}>Remover crismando(a)</Text>
            <Feather name="trash" size={18} color={colors.red.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ModalCaixinhaRegistro
        isVisible={modalCaixinhaVisible}
        onClose={() => setModalCaixinhaVisible(false)}
        idCrismando={data._id!}
      />
      <FrequenciaCrismando
        isVisible={modalFrequenciaVisible}
        onClose={() => setModalFrequenciaVisible(false)}
        frequencia={data.frequencia!}
        nomeCrismando={data.nomeCrismando}
      />
    <CrismandoCaixinhasList 
    data={data?.caixinha!}
    isVisible={modalCrismandoCaixinhasVisible}
    onClose={() => setModalCrismandoCaixinhasVisible(false)
    }
    nomeCrismando={data.nomeCrismando}
    />
    <ModalConfirmacao 
      isVisible={modalConfirmacaoVisible}
      onClose={() => setModalConfirmacaoVisible(false)}
      title={`Remover ${data.nomeCrismando}?`}
      onRemove={() => handleRemoverCrismando(data._id!)}
    />
    </SafeAreaView>
  );
}
