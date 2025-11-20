import { Modal, View, TouchableWithoutFeedback, Text} from "react-native"
import { styles } from "./styles";
import { Button } from "../ui/Button";

type Props = {
    onRemove: () => void;
    onClose: () => void
    isVisible: boolean
    title: string
}   

export default function ModalConfirmacao({onRemove, onClose, isVisible, title} : Props){
    return(
        <Modal visible={isVisible} animationType="slide" transparent>
            <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.overlayer}>
                <TouchableWithoutFeedback onPress={() => {}}> 
            <View style={styles.modalContent}>
            <Text style={styles.title}>
                {title}
            </Text>
            <View style={styles.buttons}>
                <Button onPress={onClose} style={{width: "45%"}}>
                    <Button.Title>
                        Cancelar
                    </Button.Title>
                </Button>
                <Button onPress={onRemove} style={{width: "45%"}}>
                    <Button.Title>
                        Remover
                    </Button.Title>
                </Button>
            </View>
            </View>
            </TouchableWithoutFeedback>
            </View>

            </TouchableWithoutFeedback>
        </Modal>
    )
}