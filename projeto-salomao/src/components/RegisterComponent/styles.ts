import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start", 
  },
  //   linearGradientContainer: {
  //   height: "30%",
  //   justifyContent: "center",
  //   padding: 24,
  // },
  // welcomeMessage: {
  //   fontFamily: fontFamily.bold,
  //   fontSize: 36,
  //   color: colors.white,
  //   textShadowColor: colors.red.primary,
  //   textShadowOffset: { width: 2, height: 4 },
  //   textShadowRadius: 2,
  // },
  // continueMessage:{
  //   fontFamily: fontFamily.medium,
  //   fontSize: 16,
  //   color: colors.white,
  // },
   loginAnimated: {
    position: "absolute",
    top: -10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 1,
  },
  registerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 54,
    paddingBottom: 50,
  },
  titleRegister: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
  },
  registerActions: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  buttonRegister: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red.primary,
    width: "100%",
    height: 46,
    borderRadius: 8,
    borderCurve: "circular",
    marginTop: 10,
  },
  buttonRegisterText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fontFamily.semiBold,
  },

  redirectLogin: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
  },
});
