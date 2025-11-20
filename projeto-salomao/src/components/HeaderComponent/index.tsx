import { View, Text } from "react-native";
import { Button } from "../ui/Button";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";

type Props = {
  title: string;
  onPressBack: () => void;
};

export default function HeaderComponent({ title, onPressBack }: Props) {
  return (
    <View style={styles.container}>
      <Button onPress={onPressBack} style={styles.buttonBack}>
        <Feather name="arrow-left" size={24} color="white" />
      </Button>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.divider}></View>
      </View>
    </View>
  );
}
