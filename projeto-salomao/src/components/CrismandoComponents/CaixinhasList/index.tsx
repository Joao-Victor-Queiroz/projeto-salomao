import { Modal, FlatList, View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from "react-native";
import { Caixinha } from "@/types/crismando"
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

import { styles } from "./styles";
import { formatToBrazilianDate } from "@/lib/formatToBrazilianDate";
import { formatToBrazilianCurrency } from "@/lib/formatToBrazilianCurrency";


import { router } from "expo-router";

type Props = {
    data: Caixinha[]
    nomeCrismando: string;
    isVisible: boolean;
    onClose: () => void;
}


export default function CrismandoCaixinhasList({ nomeCrismando, isVisible, onClose, data} : Props){

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Modal visible={isVisible} animationType="slide">      
            <View style={styles.modalContent}>
             <Feather
                name="x"
                color="gray"
                size={34}
                onPress={onClose}
                style={{ alignSelf: "flex-start" }}
              />
              <Text style={styles.title}>
                    Pagamentos de: {nomeCrismando}
            </Text>
            <FlatList 
                data={data}
                keyExtractor={(item) => item._id!}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.itemList} onPress={() => router.push(`/caixinha/${item._id}`)}>
                        <View style={styles.itemContent}>
                        <Text style={styles.titleDataPagamento}>
                            {formatToBrazilianDate(item.dataPagamento)}
                        </Text>
                        <Text>
                            {formatToBrazilianCurrency(item.valorPago)}
                        </Text>
                        <Feather name="edit-2" size={18} color="black"/>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{gap: 10}}
                ListEmptyComponent={
                    <View>
                        <Text style={styles.emptyMessage}>Nenhum pagamento ainda foi realizado</Text>
                    </View>
                }
            />
          
                </View>   
          
       </Modal>
              </TouchableWithoutFeedback>
    )
}