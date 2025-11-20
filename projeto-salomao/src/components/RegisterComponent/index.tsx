import {
  Pressable,
  View,
  SafeAreaView,
  Text,
  TextInput,
  Image,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "expo-router";
import Loading from "../Loading";
import Input from "../Input";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/styles/theme";

import { styles } from "./styles";

const registerSchema = z.object({
  firstName: z.string().min(1, "Nome é obrigatório!"),
  lastName: z.string().min(1, "Sobrenome é obrigatório!"),
  emailAddress: z.string().email("Email inválido!"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres!"),
});

type RegisterSchemaType = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { control, handleSubmit } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
    },
  });

  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const onSignUpPress = async (data: RegisterSchemaType) => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      await signUp.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.emailAddress,
        password: data.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (error: any) {
      alert(error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (error: any) {
      alert(error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Loading isVisible={loading} />

    
      {!pendingVerification && (
        <Animated.View
          entering={FadeInDown.delay(200).duration(2).springify()}
          style={styles.registerContainer}
        >
          <Text style={styles.titleRegister}>Cadastre-se!</Text>
          <Input
            icon={"user"}
            name={"firstName"}
            label={"Primeiro Nome"}
            control={control}
            inputProps={{ placeholder: "Digite seu primeiro nome" }}
          />
          <Input
            icon={"user"}
            name={"lastName"}
            label={"Sobrenome"}
            control={control}
            inputProps={{ placeholder: "Digite seu sobrenome" }}
          />
          <Input
            icon={"mail"}
            name={"emailAddress"}
            label={"E-mail"}
            control={control}
            inputProps={{ placeholder: "Digite seu e-mail" }}
          />
          <Input
            icon={"lock"}
            name={"password"}
            label={"Senha"}
            control={control}
            isPassword
            inputProps={{ placeholder: "Digite sua senha" }}
          />
          <Animated.View
            entering={FadeInDown.delay(400).duration(2).springify()}
            style={styles.registerActions}
          >
            <Pressable
              onPress={handleSubmit(onSignUpPress)}
              style={styles.buttonRegister}
            >
              <Text style={styles.buttonRegisterText}>Registrar</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/login")}>
              <Text style={styles.redirectLogin}>Já tem login?</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      )}
      {pendingVerification && (
        <View>
          <Text>Verifique seu E-mail</Text>
          <TextInput value={code} onChangeText={setCode} />
          <Pressable onPress={handleSubmit(onPressVerify)}>
            <Text>Enviar código</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
