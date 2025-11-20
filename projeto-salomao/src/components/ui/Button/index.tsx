import { Feather } from "@expo/vector-icons";
import { s } from "./styles";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  TextProps,
  View,
} from "react-native";

import { router } from "expo-router";

function Button({ children, style, ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={[s.container, style]}
      activeOpacity={0.8}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}



function Title({ children, isBlackText = false }: TextProps & {isBlackText?: boolean}) {
  return <Text style={[s.title, isBlackText && s.titleBlack]}>{children}</Text>;
}

Button.Title = Title;

export { Button };
