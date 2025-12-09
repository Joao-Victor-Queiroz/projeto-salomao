import { TouchableOpacity, TouchableOpacityProps, Text} from "react-native";

import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";



export function SwipeableOption({ ...rest} : TouchableOpacityProps){
    return(
        <TouchableOpacity style={styles.option} activeOpacity={0.7} {...rest}>
           <Feather name="user-minus" size={18} color="white"/>
        </TouchableOpacity>
    )
}