import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";
import { Grupo } from "@/types/crismando"
import { useRouter } from "expo-router";

import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";


type Props =  TouchableOpacityProps &{
    data: Grupo;
}

export default function GrupoCard({data, ...rest} : Props){
    const router = useRouter()

    return (
       <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={() => router.push(`/grupo/${data._id}/visualizacao`)} {...rest}>
            <View style={styles.grupoButton}>
                <Text style={styles.nomeGrupo}>{data.nomeGrupo}</Text>
                <Feather name="arrow-right" size={24} color="black" />
            </View>
        </TouchableOpacity>

    );
}