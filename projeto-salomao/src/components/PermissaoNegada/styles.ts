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
    width: width * 0.85,
    padding: 20,
    backgroundColor: "white", 
    borderRadius: 10,
    justifyContent: "center",
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
  button:{

  }
});
