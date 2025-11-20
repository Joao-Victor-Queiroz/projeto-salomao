import { View, Text,  StyleSheet } from "react-native";
import { AxiosError } from "axios";
import { Button } from "../Button";
import {styles} from "./styles";


type ErrorStateProps = {
  error: unknown;
  onRetry: () => void;
};

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  let message = "Ocorreu um erro inesperado.";

  if (error instanceof AxiosError) {
  
    if (error.message === "Network Error") {
    message = "Erro de conexão. Verifique sua internet ou tente novamente mais tarde.";
  } else {
    message = error.response?.data?.message || error.message;
  }
  } else if (error instanceof Error) {

    message = error.message;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={onRetry}>
        <Button.Title>Carregar novamente</Button.Title>
      </Button>
    </View>
  );
}
