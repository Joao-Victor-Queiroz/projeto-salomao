import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Crismando } from "@/types/crismando";
import { styles } from "./styles";
import CrismandoCard from "../CrismandoCard";
import Loading from "../../Loading";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../ui/Button";
import { useUser } from "@clerk/clerk-expo";
import PermissaoNegada from "@/components/PermissaoNegada";
import { Feather } from "@expo/vector-icons";

type Props = {
  data: Crismando[];
  isLoading: boolean;
  hasNextPage?: boolean;
  onLoadMore: () => void;
};

export default function CrismandosList({
  data,
  isLoading,
  hasNextPage,
  onLoadMore,
}: Props) {
  if (isLoading) return <Loading isVisible={isLoading} />;

  if (!isLoading && data.length === 0) {
    return <Text>Nenhum crismando encontrado.</Text>;
  }

  const router = useRouter();
  const { user } = useUser();

  const [searchCrismando, setSearchCrismando] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const filterCrismandosBySearch =
    data.filter((crismando) =>
      crismando.nomeCrismando
        .toLowerCase()
        .includes(searchCrismando.toLowerCase())
    ) || [];

  const dataOrdenadaAtivoInativo = [...data]
    .sort((a, b) => a.nomeCrismando.localeCompare(b.nomeCrismando))
    .sort((a, b) => (a.ativo === b.ativo ? 0 : a.ativo ? -1 : 1));

  const dadosVisiveis = searchCrismando
    ? filterCrismandosBySearch
    : dataOrdenadaAtivoInativo;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.actions}>
        <View style={styles.pesquisaCrismandos}>
          <Feather name="search" size={24} color="gray" />
          <TextInput
            placeholder="Pesquisar crismando"
            value={searchCrismando}
            onChangeText={setSearchCrismando}
            style={{ flex: 1 }}
          />
        </View>
        <Button
          style={{ width: "20%" }}
          onPress={() => router.push("/crismando/cadastrar")}
        >
          <Button.Title>
            <Feather name="user-plus" size={20}/>
          </Button.Title>
        </Button>
      </View>

        <FlatList
          data={dadosVisiveis}
          keyExtractor={(item, index) => {
            if (!item._id) {
              console.warn("Item sem _id:", item);
              return `item-${index}`;
            }
            return item._id;
          }}
          renderItem={({ item }) => <CrismandoCard data={item} />}
          onEndReached={() => {
            if (hasNextPage) onLoadMore();
          }}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            isLoading ? <ActivityIndicator size="small" /> : null
          }
          style={{ flex: 1 }}
          ListEmptyComponent={  <Text
          style={{ textAlign: "center", marginTop: 20, fontWeight: "bold" }}
        >
          Nenhum crismando encontrado.
        </Text>}
        />
    
      <PermissaoNegada
        isVisible={modalVisible}
        descricao="CADASTRAR CRISMANDO"
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
