import { StyleSheet } from "react-native";
import { fontFamily, colors } from "@/styles/theme";

export const styles = StyleSheet.create({
    button:{
         padding: 14,
          backgroundColor: colors.white,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
        // flexDirection: 'row',
        // borderColor: colors.gray[200],
        // borderWidth: 2,
        // padding: 14,
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // borderRadius: 8,
    },
    dropdownText:{
        fontFamily: fontFamily.bold,
        fontSize: 16,
        color: 'black'
    },
    frequenciaContent:{
       padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "black",
        backgroundColor: colors.white
    },
    dataPresenca:{
        fontFamily: fontFamily.bold,
        fontSize: 16,
    },
    frequenciaInfo: {
        fontFamily: fontFamily.medium,
        fontSize: 14,
    },
    justificativaDescricao:{
        fontFamily: fontFamily.medium,
        fontSize: 14,
    }
})