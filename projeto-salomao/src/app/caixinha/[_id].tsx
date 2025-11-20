import {View} from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useUniqueCaixinha } from "@/hooks/useCaixinha"
import Loading from "@/components/Loading"
import CaixinhaPage from "@/components/Caixinha"
import ErrorState from "@/components/ui/Error"

export default function Caixinha(){
    const {_id} = useLocalSearchParams<{ _id: string }>()

    const {data, isLoading, isError , error, refetch} = useUniqueCaixinha(_id)

    if (isLoading) return <Loading isVisible={isLoading} />;

    if (isError) return <ErrorState error={error} onRetry={refetch} />;

    if (!data) return <View><ErrorState error={{message: "Caixinha não encontrada"}} onRetry={refetch} /></View>;

    return <CaixinhaPage data={data} />
}