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
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    gap: 15,
    width: "100%"
  
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.red.primary,
  },
  information: {
    fontFamily: fontFamily.regular,
    fontSize: 18,
  },
  crismandoItem: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  crismandoInfo: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  crismandoButton: {
    backgroundColor: colors.red.primary,
    padding: 6,
    borderRadius: 6,
  },
  buttonText: {
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
  inputContainer: {
    width: "100%",
  },
  labelInput: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },
  dataInput: {
    flexDirection: "row",
    borderRadius: 15,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    overflow: "hidden",
  },
  inputIcon: {
    height: 56,
    width: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 2,
  },
  input: {
    flex: 1,
    paddingLeft: 16,
    fontFamily: fontFamily.light,
  },
  // dataInput: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   width: "100%",
  //   paddingHorizontal: 10,
  //   borderWidth: 2,
  //   borderRadius: 8,
  //   borderColor: colors.gray[300],
  // },
  // inputIcon: {
  //   borderRightWidth: 2,
  //   borderRightColor: colors.gray[200],
  //   paddingRight: 5,
  //     justifyContent: "center",
  //   alignItems: "center",
});
