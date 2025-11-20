import { StyleSheet, Dimensions } from "react-native";
import { fontFamily, colors } from "@/styles/theme";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({

  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "white", 
    borderRadius: 10,
    gap: 15,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.red.primary
  },
  information:{
    fontFamily: fontFamily.regular,
    fontSize: 18,
  },
  semCrismandos: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    textAlign: "center",
  },
  crismandoItem:{
    flex: 1,
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  crismandoInfo: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  crismandoButton:{
    backgroundColor: colors.red.primary,
    padding: 6,
    borderRadius: 6, 
 
  },
  buttonText: {
    fontFamily: fontFamily.medium,
    color: colors.white
  }
});
