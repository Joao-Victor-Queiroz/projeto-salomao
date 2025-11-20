import {View} from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useUniqueFrequencia } from "@/hooks/useCrismandos"
import Loading from "@/components/Loading"
import FrequenciaPage from "@/components/Frequencia/FrequenciaPage"
import ErrorState from "@/components/ui/Error"

export default function Frequencia(){
    const {_id} = useLocalSearchParams<{ _id: string }>()

    const {data, isLoading, isError , error, refetch} = useUniqueFrequencia(_id);

    if (isLoading || !_id) {
        return <Loading isVisible={true} />;
    }

    if (isError) {
        return <ErrorState error={error} onRetry={refetch} />;
    }

    if (!data) {
        return <ErrorState error={{message: "Frequência não encontrada"}} onRetry={refetch} />;
    }

    return <FrequenciaPage  dataFrequencia={data}/>
}