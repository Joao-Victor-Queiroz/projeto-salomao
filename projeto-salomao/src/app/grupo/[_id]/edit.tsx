import { View } from "react-native";
import { useUniqueGrupo } from "@/hooks/useGrupos";
import GrupoForm from "@/components/GruposComponents/GrupoForm";
import ErrorState from "@/components/ui/Error";
import { useLocalSearchParams } from "expo-router";

export default function EditarGrupo() {
  const { _id } = useLocalSearchParams<{ _id: string }>();

  const { data, isLoading, isError, error, refetch } = useUniqueGrupo(_id);

  if (!data) return <View>Não encontrado</View>;

  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  return <GrupoForm initialData={data} mode="edit" />;
}
