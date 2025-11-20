import { StyleSheet } from "react-native";
import {fontFamily, colors} from "@/styles/theme"
import { FontAwesome } from "@expo/vector-icons";

export const s = StyleSheet.create({
    container:{
        width: 250,
        height: 42,
        backgroundColor: colors.red.primary,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        gap: 5,
    },
    title:{
        color:"white", 
        fontFamily: fontFamily.semiBold,
        
    },
    titleBlack: {
        color: "black",
        fontFamily: fontFamily.semiBold
    }
  
})
