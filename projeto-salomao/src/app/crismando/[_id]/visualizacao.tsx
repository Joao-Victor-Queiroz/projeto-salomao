import CrismandoPage from "@/components/CrismandoComponents/CrismandoPage";
import { useUniqueCrismando } from "@/hooks/useCrismandos"
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import ErrorState from "@/components/ui/Error";


export default function ViewCrismando(){
    const {_id} = useLocalSearchParams<{_id: string}>()

    const {data, isLoading, error, isError, refetch} = useUniqueCrismando(_id)
    
    if (!data) return <View>Não encontrado</View>

    if (isError) return <ErrorState error={error} onRetry={refetch}/>

    return <CrismandoPage data={data} isLoading={isLoading}/>
}