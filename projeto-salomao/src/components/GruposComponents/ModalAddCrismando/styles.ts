import { StyleSheet, Dimensions } from "react-native";
import { fontFamily, colors } from "@/styles/theme";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  overlayer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    height: "100%",
    width: "100%",
    padding: 20,
    backgroundColor: "white", 
    borderRadius: 10,
    alignItems: "center",
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
