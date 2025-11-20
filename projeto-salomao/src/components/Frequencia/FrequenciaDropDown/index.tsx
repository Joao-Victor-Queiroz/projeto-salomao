import { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { formatToBrazilianDate } from "@/lib/formatToBrazilianDate";
import { Frequencia } from "@/types/crismando";
import { router } from "expo-router";

import { styles } from "./styles";

type Props = {
  faltas: Frequencia[];
};

export default function FaltasDropdown({ faltas }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [measured, setMeasured] = useState(false);
  const contentHeight = useRef(0);

  const height = useSharedValue(0);
  const rotation = useSharedValue(0);

  const toggleDropdown = () => {
    height.value = isOpen
      ? withTiming(0, { duration: 300 })
      : withTiming(contentHeight.current, { duration: 300 });

    rotation.value = isOpen
      ? withTiming(0, { duration: 300 })
      : withTiming(180, { duration: 300 });

    setIsOpen(!isOpen);
  };

  const animatedDropdownStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.dropdownText}>Faltas ({faltas.length})</Text>
        <Animated.View style={animatedIconStyle}>
          <Feather name="chevron-down" size={20} color="black" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[{ overflow: "hidden" }, animatedDropdownStyle]}
      >
        <View
          style={{
            position: measured ? "relative" : "absolute",
            opacity: measured ? 1 : 0,
          }}
          onLayout={(e) => {
            if (!measured) {
              contentHeight.current = e.nativeEvent.layout.height;
              setMeasured(true);
            }
          }}
        >
          <FlatList
            data={faltas}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ padding: 5 }}
            ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.frequenciaContent, { width: 150 }]}
                onPress={() => router.push(`/frequencia/${item._id}`)}
              >
                <Text style={styles.dataPresenca}>
                  {formatToBrazilianDate(item.dataPresenca)}
                </Text>
                {item.status === "FJ" ? (
                  <Text numberOfLines={1} style={styles.justificativaDescricao}>
                    {item.justificativa}
                  </Text>
                ) : (
                  <></>
                )}
                <Text style={[styles.frequenciaInfo, { flexShrink: 1 }]}>
                  {item.status === "FJ"
                    ? "Falta Justificada"
                    : item.status === "FNJ"
                    ? "Falta Não Justificada"
                    : "Não registrado"}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Animated.View>
    </View>
  );
}
