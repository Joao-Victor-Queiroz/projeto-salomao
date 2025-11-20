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
import { Crismando, Frequencia, FrequenciaPost } from "@/types/crismando";
import { useRegistrarFrequencia } from "@/hooks/useGrupos";
import Toast from "react-native-toast-message";
import { FrequenciaCard } from "./frequenciaCard";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  frequencia: Frequencia[];
  nomeCrismando: string;
};

export default function FrequenciaCrismando({
  isVisible,
  onClose,
  frequencia,
  nomeCrismando
}: Props) {


  const frequenciasOrdenadas = [...frequencia].sort((a, b) => 
  new Date(a.dataPresenca).getTime() - new Date(b.dataPresenca).getTime() 
  )

  return (
    <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.modalContent}>
              <Feather
                name="x"
                color="gray"
                size={30}
                onPress={onClose}
                style={{ alignSelf: "flex-start" }}
              />
              <Text style={styles.title}>
                Frequência de {nomeCrismando}
              </Text>

              {frequencia.length === 0 ? (
                <Text>Frequência ainda não registrada para esse crismando.</Text>
              ) : (
                <FlatList
                  data={frequenciasOrdenadas as Frequencia[]}
                  keyExtractor={(item) => item._id!}
                  renderItem={({ item }) => (
                  <FrequenciaCard frequencia={item}/>
                  )}
                  contentContainerStyle={{ paddingVertical: 15, gap: 6 }}
            
                  showsVerticalScrollIndicator={false}
                />
              )}

           </View>

    </Modal>
  );
}
