import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Crismando } from "@/types/crismando";

import { pegarPrimeiroEUltimoNome } from "@/lib/firstAndLastName";



import { styles } from "./styles";
import { colors } from "@/styles/theme";
import { router } from "expo-router";

export default function GrupoCrismandoCard({ data }: { data: Crismando }) {
  const faltas = data?.frequencia?.filter(
    (f) => f.status === "FJ" || f.status === "FNJ"
  );
  return (
   
      <TouchableOpacity
        style={[
          styles.crismando,
          faltas!.length < 3
            ? { backgroundColor: colors.green }
            : faltas!.length <= 6
            ? { backgroundColor: colors.yellow[300] }
            : { backgroundColor: colors.red.third },
          data.ativo === false && {opacity: 0.5}
        ]}
        activeOpacity={0.7}
        onPress={() => router.navigate(`/crismando/${data._id!}/visualizacao`)}
      >
        <Text style={styles.nomeCrismando}>
          {pegarPrimeiroEUltimoNome(data.nomeCrismando)}
        </Text>
        <Text style={styles.infoCrismando}>{data.idade} anos</Text>
        <Text style={styles.infoCrismando}>{faltas?.length} faltas</Text>
      </TouchableOpacity>
    
  );
}
