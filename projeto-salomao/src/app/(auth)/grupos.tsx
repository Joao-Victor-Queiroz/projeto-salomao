import { View, Text } from "react-native";
import { useGrupos } from "@/hooks/useGrupos";
import GruposList from "@/components/GruposComponents/GruposList";
import ErrorState from "@/components/ui/Error";
import Loading from "@/components/Loading";

export default function Grupos() {
  const { data, isLoading, isError, error, refetch} = useGrupos();
  if (isLoading) {
    return <Loading isVisible={isLoading}/>
  }
  
  if (isError) {
    return  <ErrorState error={error} onRetry={refetch}/>
  }
  
  if (!data) {
    return <Text>Nenhum grupo encontrado</Text>;
  }
  
  if (isError) return <ErrorState error={error} onRetry={refetch}/>
    

  return <GruposList data={data} isLoading={isLoading} />;
}
