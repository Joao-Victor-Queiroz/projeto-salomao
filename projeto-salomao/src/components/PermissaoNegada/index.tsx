import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "../ui/Button";

import { styles } from "./styles";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  descricao: string;
};

export default function PermissaoNegada({
  isVisible,
  onClose,
  descricao,
}: Props) {
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlayer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>AÇÃO NEGADA!</Text>
              <Text style={styles.information}>
                Você não tem autorização para: {descricao.toUpperCase()}
              </Text>
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
