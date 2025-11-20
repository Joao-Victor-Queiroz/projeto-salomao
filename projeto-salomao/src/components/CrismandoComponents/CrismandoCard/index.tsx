import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";
import { Crismando } from "@/types/crismando";
import { pegarPrimeiroEUltimoNome } from "@/lib/firstAndLastName";
import { useRouter } from "expo-router";

import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  data: Crismando;
};

export default function CrismandoCard({ data, ...rest }: Props) {
  const nomeGrupoCrismando = data.grupo?.nomeGrupo || "Sem grupo";
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.container, !data.ativo && { opacity: 0.5 }]}
      activeOpacity={0.8}
      onPress={() => router.push(`/crismando/${data._id}/visualizacao`)}
      {...rest}
    >
      <View style={styles.cardContent}>
        <View style={styles.mainInfo}>
        <Text style={styles.nomeCrismando}>
          {pegarPrimeiroEUltimoNome(data.nomeCrismando)}
        </Text>
        <Text style={styles.idadeCrismando}>{data.idade} anos</Text>
        </View>
        <Text style={styles.idadeCrismando} >
          {nomeGrupoCrismando}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
