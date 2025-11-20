import { Frequencia } from "@/types/crismando";
import { TouchableOpacity, View, Text, Pressable} from "react-native";
import { formatToBrazilianDate } from "@/lib/formatToBrazilianDate";
import { useState } from "react";

import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

type Props = {
    frequencia: Frequencia;
}

export function FrequenciaCard({frequencia} : Props){
    return(
        <View style={styles.frequenciaContainer}>
            <TouchableOpacity style={styles.frequenciaButton} onPress={() => router.push(`/frequencia/${frequencia._id}`)}>
                <View>
                    <Text style={styles.frequenciaData}>{formatToBrazilianDate(frequencia.dataPresenca)}</Text>
                    <Text style={styles.frequenciaInfo}>{frequencia.status === "P" ? "Presente" : frequencia.status === "FJ" ? "Falta Justificada" : "Falta Não Justificada"}</Text>
                    {frequencia.status === "FJ" && <Text style={styles.frequenciaInfo}>Justificativa: {frequencia.justificativa}</Text>}
                </View>
                
            </TouchableOpacity>
            <Feather name="arrow-down" size={34} color="white"/>
        </View>
    )
}