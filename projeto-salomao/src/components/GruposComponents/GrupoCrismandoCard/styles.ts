import {StyleSheet, Dimensions} from "react-native";
import { fontFamily, colors } from "@/styles/theme";

const {width} = Dimensions.get("window")

export const styles = StyleSheet.create({
     nomeCrismando:{
    fontFamily: fontFamily.bold,
    fontSize: width > 600 ? 20 : 16
  },
   crismando:{
    flexDirection: 'row',
    width: "100%",
    justifyContent: "space-around",
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  infoCrismando: {
    fontFamily: fontFamily.medium
  },


  option:{
    backgroundColor: colors.red.third,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems:"center",
    justifyContent: "center"
  }

})