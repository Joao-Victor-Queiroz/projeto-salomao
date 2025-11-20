import { TextInput, TextInputProps, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Controller } from "react-hook-form";

import clsx from "clsx";
import s from "./styles";
import { useState } from "react";

type Props = {
  icon: keyof typeof Feather.glyphMap;
  name: string;
  label?: string;
  control: any;
  rules?: object;
  inputProps?: TextInputProps;
  disabled?: boolean;
  isPassword?: boolean;
};

export default function Input({
  icon,
  name,
  label,
  control,
  rules,
  disabled,
  inputProps,
  isPassword = false,
}: Props) {
  const [secure, setSecure] = useState<boolean>(isPassword);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        const color = clsx({
          "#E63946": error,
          black: value && !error,
          "#8d8d99": !value,
        });

        return (
          <View style={s.container}>
            <Text style={s.labelInput}>{label}</Text>
            <View style={[s.inputWrapper, { borderColor: color }]}>
              <View style={[s.icon, { borderRightColor: color}, inputProps?.multiline && {height: 100}]}>
                <Feather name={icon} size={24} color={color} />
              </View>
              <TextInput
                autoCapitalize="sentences"
                style={[s.input, inputProps?.multiline && {textAlignVertical: "top"}]}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={secure}
                {...inputProps}
              />
              {isPassword && (
                <View style={[s.iconToggle]}>
                <Feather
                  name={secure ? "eye-off" : "eye"}
                  size={24}
                  color={color}
                  onPress={() => setSecure(!secure)}
                />
                </View>
              )}
            </View>

            {error && <Text style={s.errorText}>{error?.message || ""}</Text>}
          </View>
        );
      }}
    />
  );
}
