import {View} from 'react-native'
import { useUniqueGrupo } from "@/hooks/useGrupos";
import GrupoPage from "@/components/GruposComponents/GrupoPage";
import ErrorState from "@/components/ui/Error";
import { useLocalSearchParams } from "expo-router";

export default function VisualizarGrupo() {
  const { _id } = useLocalSearchParams<{ _id: string }>();

  const { data, isLoading, isError, error, refetch } = useUniqueGrupo(_id);

  if (!data) return <View>Não encontrado</View>;

  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  return <GrupoPage data={data} isLoading={isLoading} />;
}
