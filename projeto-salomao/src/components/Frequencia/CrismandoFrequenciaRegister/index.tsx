import {
  View,
  TouchableOpacityProps,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { Crismando } from "@/types/crismando";
import { styles } from "./styles";
import { pegarPrimeiroEUltimoNome } from "@/lib/firstAndLastName";

type Props = {
  data: Crismando;
  onChangeStatus: (value: string) => void;
  selectedStatus: string;
  onChangeJustificativa?: (text: string) => void;
  justificativa: string;
};

export default function CrismandoFrequenciaRegister({
  data,
  onChangeStatus,
  selectedStatus,
  onChangeJustificativa,
  justificativa,
}: Props) {
  const options = [
    { label: "Presente", value: "P" },
    { label: "Falta Justificada", value: "FJ" },
    { label: "Falta Não Justificada", value: "FNJ" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.nomeCrismando}>{data.nomeCrismando}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = selectedStatus === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onChangeStatus(option.value)}
              style={
                isSelected ? styles.statusButtonSelected : styles.statusButton
              }
            >
              <Text
                style={
                  isSelected ? styles.buttonTextSelected : styles.buttonText
                }
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        {selectedStatus === "FJ" && (
          <TextInput
            style={styles.justificativaInput}
            placeholder="Digite a justificativa..."
            value={justificativa}
            onChangeText={onChangeJustificativa}
          />
        )}
      </View>
    </View>
  );
}
