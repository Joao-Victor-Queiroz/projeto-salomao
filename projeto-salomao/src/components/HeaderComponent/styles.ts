import { StyleSheet, Dimensions} from "react-native";
import { fontFamily, colors } from "@/styles/theme";

const {width} = Dimensions.get('window')


export const styles = StyleSheet.create({
    container:{
        gap: 15,
        width: "100%",
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    buttonBack: {
        width: "20%"
    },
    title:{
        fontFamily: fontFamily.bold, 
        fontSize: width > 600 ? 34 : 24,
    },
    divider: {
        width: "100%",
        height: 2,
        backgroundColor: colors.red.primary
    }
    
})