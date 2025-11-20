import { TextInput, TextInputProps, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import InputCurrency, { CurrencyInputProps } from "react-native-currency-input";

import clsx from "clsx";
import s from "./styles";

type Props = CurrencyInputProps & {
  icon: keyof typeof Feather.glyphMap;
  name: string;
  label?: string;
  control: any;
  rules?: object;
  inputProps?: TextInputProps;
};

export default function CurrencyInput({
  icon,
  name,
  label,
  control,
  rules,
  inputProps,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
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
              <View style={[s.icon, { borderRightColor: color }]}>
                <Feather name={icon} size={24} color={color} />
              </View>
              <InputCurrency
                autoCapitalize="none"
                style={s.input}
                onChangeValue={onChange}
                onBlur={onBlur}
                value={value}
                {...inputProps}
              />
            </View>

            {error && <Text style={s.errorText}>{error?.message || ""}</Text>}
          </View>
        );
      }}
    />
  );
}
