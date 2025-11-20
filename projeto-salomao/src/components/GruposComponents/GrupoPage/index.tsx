import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useRef } from "react";
import { Grupo } from "@/types/crismando";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/Button";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import { useUser } from "@clerk/clerk-expo";
import ModalAdicionarCrismando from "../ModalAddCrismando";
import ModalConfirmacao from "@/components/ModalRemoverConfirmacao";
import RegistroFrequencia from "../RegistroFrequencia";
import GrupoCrismandoCard from "../GrupoCrismandoCard";
import HeaderComponent from "@/components/HeaderComponent";
import { colors } from "@/styles/theme";
import { useRemoverGrupo } from "@/hooks/useGrupos";
import Toast from "react-native-toast-message";
import { formatToBrazilianCurrency } from "@/lib/formatToBrazilianCurrency";

import Swipeable, {SwipeableMethods} from "react-native-gesture-handler/ReanimatedSwipeable"
import { SwipeableOption } from "../GrupoCrismandoCard/option";

type Props = {
  data: Grupo;
  isLoading: boolean;
};

export default function GrupoPage({ data, isLoading }: Props) {
  

  const { mutate: removerGrupo, isPending } = useRemoverGrupo();

  const { user } = useUser();

  const router = useRouter();

  const [modalCrismandosVisible, setModalCrismandosVisible] = useState(false);
  const [modalFrequenciaVisible, setModalFrequenciaVisible] = useState(false);
  const [modalConfirmacaoVisible, setModalConfirmacaoVisible] = useState(false);

 const dataCrismandosOrdenados = data.crismandos
  ? [...data.crismandos].sort((a, b) => {
    
      if (a.ativo !== b.ativo) {
        return a.ativo ? -1 : 1; 
      }

      const faltasA = a.frequencia?.filter((f) => f.status === "FJ" || f.status === "FNJ").length ?? 0;
      const faltasB = b.frequencia?.filter((f) => f.status === "FJ" || f.status === "FNJ").length ?? 0;
   
      if (faltasA === faltasB) return a.nomeCrismando.localeCompare(b.nomeCrismando);
    
      return faltasA - faltasB;
    })
  : [];

    const caixinhasCrismandos = data.crismandos?.flatMap((crismando) => crismando.caixinha ? crismando.caixinha : [])

    const totalCaixinhaGrupo = caixinhasCrismandos?.reduce((acc, caixinha) => acc + caixinha.valorPago, 0)
   
  const handleRemoverGrupo = (idGrupo: string) => {
    if (!idGrupo) {
      return;
    }

    removerGrupo(idGrupo, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Grupo removido com sucesso!",
          position: "top",
          visibilityTime: 3000,
        });
        router.replace("/grupos");
       
      },
      onError: (error: any) => {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Erro ao remover grupo",
          position: "top",
          visibilityTime: 3000,
        });
        
      },
      onSettled: () => {
         setModalConfirmacaoVisible(false)
      }
    });
  };

  if (isLoading || isPending) return <Loading isVisible={isLoading} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <HeaderComponent
          title={data?.nomeGrupo}
          onPressBack={() => router.push("/grupos")}
        />
        <View>
          <Text style={styles.valorTotalPago}>Total pago pelo grupo: {formatToBrazilianCurrency(totalCaixinhaGrupo!)}</Text>
        </View>
        {user?.publicMetadata?.cargo === "admin" ||
        user?.publicMetadata?.cargo === "coordenador_frequencia" ? (
          <View style={{ gap: 10 }}>
        
            <View style={styles.actions}>
              <Text style={styles.actionsText}>Ações</Text>
              <Button
                style={{ width: "45%" }}
                onPress={() => router.push(`/grupo/${data._id!}/edit`)}
              >
                <Button.Title>
                  Editar <Feather name="edit-2" size={16} color="white" />
                </Button.Title>
              </Button>
            </View>
            <View style={styles.grupoActions}>
              <Button
                style={styles.grupoActionButton}
                onPress={() => setModalFrequenciaVisible(true)}
              >
                <Button.Title isBlackText>Registrar Frequência</Button.Title>
              </Button>
              <Button
                style={styles.grupoActionButton}
                onPress={() => setModalCrismandosVisible(true)}
              >
                <Button.Title isBlackText>
                  Adicionar Crismando{" "}
                  <Feather name="user-plus" size={16} color="black" />
                </Button.Title>
              </Button>
            </View>
          </View>
        ) : (
          <></>
        )}

        <Text style={styles.sectionTitle}>Crismandos</Text>
        <FlatList
          style={{flex: 1}}
          data={dataCrismandosOrdenados}
          keyExtractor={(item) => item._id!}
          renderItem={({ item }) => { 
            let currentItem: SwipeableMethods | null = null

            return(
            <Swipeable 
          
            containerStyle={{borderRadius: 8}} 
            renderRightActions={() => <SwipeableOption text="Remover crismando do grupo?"/>}
            overshootRight={false}
            >
              <GrupoCrismandoCard data={item} />
            </Swipeable>
        )}}
          contentContainerStyle={styles.crismandosGrupo}
          ListEmptyComponent={
            <Text style={styles.isEmpty}>
              Não há crismandos registrados no grupo
            </Text>
          }
          showsVerticalScrollIndicator={false}
        />
        {user?.publicMetadata?.cargo === "admin" ||
        user?.publicMetadata?.cargo === "coordenador_frequencia" ? (
          <View style={{ gap: 20 }}>
            <TouchableOpacity
              style={styles.removerButton}
              disabled={isPending}
              onPress={() => setModalConfirmacaoVisible(true)}
            >
              <Text style={styles.removerButtonText}>Remover grupo</Text>
              <Feather name="trash" size={18} color={colors.red.primary} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
      <ModalAdicionarCrismando
        isVisible={modalCrismandosVisible}
        onClose={() => setModalCrismandosVisible(false)}
        idGrupo={data._id!}
      />
      <RegistroFrequencia
        idGrupo={data?._id!}
        isVisible={modalFrequenciaVisible}
        onClose={() => setModalFrequenciaVisible(false)}
      />
      <ModalConfirmacao 
      isVisible={modalConfirmacaoVisible}
      onClose={() => setModalConfirmacaoVisible(false)}
      title={`Remover ${data.nomeGrupo}?`}
      onRemove={() => handleRemoverGrupo(data._id!)}
      />
    </SafeAreaView>
  );
}
