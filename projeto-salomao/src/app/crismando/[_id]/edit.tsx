import CrismandoForm from "@/components/CrismandoComponents/CrismandoForm";
import { useUniqueCrismando } from "@/hooks/useCrismandos";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import ErrorState from "@/components/ui/Error";

export default function EditarCrismando() {
  const { _id } = useLocalSearchParams<{ _id: string }>();

  const { data,  error, isError, refetch } = useUniqueCrismando(_id);

  if (!data) return <View>Não encontrado</View>;

  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  return <CrismandoForm mode="edit" initialData={data} />;
}
