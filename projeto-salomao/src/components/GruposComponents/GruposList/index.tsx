import { FlatList, Text, SafeAreaView } from "react-native";
import { Grupo } from "@/types/crismando";
import Loading from "@/components/Loading";
import GrupoCard from "../GrupoCard";
import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";

import { styles } from "./styles";

type Props = {
  data?: Grupo[];
  isLoading: boolean;
};

export default function GruposList({ data, isLoading }: Props) {
  const router = useRouter();

  if (isLoading) return <Loading isVisible={isLoading} />;

  if (!isLoading && data?.length === 0) {
    return <Text>Nenhum grupo encontrado.</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Button
        style={{ width: "100%" }}
        onPress={() => router.push("/grupo/cadastrar")}
      >
        <Button.Title>Adicionar Grupo</Button.Title>
      </Button>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id || ""}
        renderItem={({ item }) => <GrupoCard data={item} />}
      />
    </SafeAreaView>
  );
}
