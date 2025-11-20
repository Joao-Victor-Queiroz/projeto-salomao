import {
  Pressable,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import Animated, {
  FadeInDown,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/styles/theme";

const loginSchema = z.object({
  emailAddress: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});
type LoginSchemaType = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [loading, setLoading] = useState(false);

  const onSignInPress = async (data: LoginSchemaType) => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: data.emailAddress,
        password: data.password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
      Toast.show({
        type: "success",
        text1: "Login realizado",
        position: "top",
        visibilityTime: 3000,
      });
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Usuário ou senha incorreto(a)!",
        position: "top",
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Loading isVisible={loading} />

        <LinearGradient
          colors={[colors.red.primary, colors.red.secondary]}
          style={styles.linearGradientContainer}
        >
          <Animated.View
            entering={FadeInDown.delay(200).duration(2).springify()}
          >
            <View style={styles.linearGradientContent}>
              <Text style={styles.welcomeMessage}>Olá, seja bem-vindo(a)!</Text>
              <Text style={styles.continueMessage}>
                Faça login para continuar.
              </Text>
              {/* <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            /> */}
            </View>
          </Animated.View>
        </LinearGradient>

        <Animated.View
          entering={FadeInDown.delay(300).duration(2).springify()}
          style={styles.loginContainer}
        >
          <Input
            icon={"user"}
            name={"emailAddress"}
            label={"Email"}
            control={control}
            rules={{ required: "Este campo é obrigatório!" }}
            inputProps={{ placeholder: "Digite seu email" }}
          />
          <Input
            icon={"lock"}
            name={"password"}
            label={"Senha"}
            control={control}
            isPassword
            rules={{ required: "Este campo é obrigatório!" }}
            inputProps={{ placeholder: "Digite sua senha..." }}
          />
          <Animated.View
            entering={FadeInDown.delay(400).duration(2).springify()}
            style={styles.loginActions}
          >
            <Pressable
              onPress={handleSubmit(onSignInPress)}
              style={styles.buttonLogin}
            >
              <Text style={styles.buttonLoginText}>Entrar</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/register")}>
              <Text style={styles.redirectRegister}>Criar Conta</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}
