import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import MaskInput, { Masks } from "react-native-mask-input";
import clsx from "clsx";
import s from "./styles";

type MaskType = "telefone" | "cep" | "data"

type Props = {
  icon: keyof typeof Feather.glyphMap;
  label?: string;
  name: string;
  control: any;
  maskType: MaskType;
  disabled?: boolean;
  rules?: object;
};

export default function MaskInputs({
  icon,
  label,
  name,
  control,
  maskType,
  disabled,
  rules,
}: Props) {
  const telefoneMask = [
    "(",
    /\d/,
    /\d/,
    ")",
    " ",
    "9",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];

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
              <View style={[s.icon, { borderRightColor: color }]}>
                <Feather name={icon} size={24} color={color} />
              </View>
              {maskType === "telefone" ? (
                <MaskInput
                  style={s.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  mask={telefoneMask}
                />
              ) : maskType === "cep" ? (
                <MaskInput
                  style={s.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  mask={cepMask}
                />
              ) : maskType === "data" ? (
                <MaskInput
                  style={s.input}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  mask={Masks.DATE_DDMMYYYY}
                />
              ) : (
                <Text>Não foi possível carregar esse campo</Text>
              )}
            </View>
          </View>
        );
      }}
    />
  );
}
