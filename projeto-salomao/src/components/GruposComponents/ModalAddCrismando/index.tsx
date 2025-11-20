import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { Button } from "../../ui/Button";
import { useAllFreeCrismandos } from "@/hooks/useCrismandos";
import { useAdicionarCrismandoAoGrupo } from "@/hooks/useGrupos";
import Loading from "@/components/Loading";
import { styles } from "./styles";
import { Crismando } from "@/types/crismando";
import Toast from "react-native-toast-message";
import {pegarPrimeiroEUltimoNome} from "@/lib/firstAndLastName";
import { Feather } from "@expo/vector-icons";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  idGrupo: string;
};

export default function ModalAdicionarCrismando({
  isVisible,
  onClose,
  idGrupo,
}: Props) {
  const { data, isLoading, isError, error, refetch } = useAllFreeCrismandos();
  const {mutate: adicionarCrismando, isPending} = useAdicionarCrismandoAoGrupo()


  const handleAdicionarCrismando = (idCrismando: string) => {
        if(!idGrupo || !idCrismando){
            Toast.show({
                type: 'error',
                text1: 'Erro ao adicionar crismando ao grupo'
            });
            return;
        }

        adicionarCrismando({idGrupo, idCrismando},
         {
            onSuccess: () => {
                Toast.show({
                    type:'success',
                    text1: "Crismando adicionado ao grupo com sucesso!"
                })
                onClose()
            },
            onError: ( ) => {
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao adicionar crismando ao grupo',
                   
                })
            }
         }
        )
  }

  if (isLoading || isPending) {
    return <Loading isVisible={isLoading} />;
  }

  if (isError) {
    return (
      <Modal visible={isVisible} onRequestClose={onClose} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlayer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <Text style={styles.title}>Ocorreu um erro...</Text>
                <Text>{(error as Error).message}</Text>
                <Button onPress={() => refetch()}>
                  <Button.Title>Recarregar</Button.Title>
                </Button>
                <Button onPress={onClose}>
                  <Button.Title>Fechar</Button.Title>
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
 

            <View style={styles.modalContent}>
               <Feather name="x" color="gray" size={30} onPress={onClose} style={{alignSelf: "flex-start"}}/>
              <Text style={styles.title}>Crismandos Livres</Text>
             {data && data.length > 0 ? (
                 <FlatList
                data={data}
                keyExtractor={(item: Crismando) => item._id!}
                renderItem={({ item }) => (
                  <View style={styles.crismandoItem}>
                    <Text style={styles.crismandoInfo}>{pegarPrimeiroEUltimoNome(item.nomeCrismando)}</Text>
                    <Text style={styles.crismandoInfo}>{item.idade} anos</Text>
                    <TouchableOpacity style={styles.crismandoButton} onPress={() => handleAdicionarCrismando(item._id!)}>
                      <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                  </View>
                )}
                contentContainerStyle={{paddingVertical: 10, gap: 6}}
              />
             ) : (
                <Text style={styles.semCrismandos}>Todos os crismandos estão em grupos!</Text>
             )}
              {/* <Button onPress={onClose}>
                <Button.Title>Fechar</Button.Title>
              </Button> */}
            </View>
    </Modal>
  );
}
