import { StyleSheet, Dimensions } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

const {width} = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    gap: 12,
  },
  linearGradientContainer: {
    height: "45%",
    justifyContent: "center",
    padding: 24,
  },
  linearGradientContent: {
  },
  welcomeMessage: {
    fontFamily: fontFamily.bold,
    fontSize: width > 600 ? 62 : 36,
    color: colors.white,
    textShadowColor: colors.red.primary,
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 2,
  },
  continueMessage: {
    fontFamily: fontFamily.medium,
    fontSize: width > 600 ? 24 : 16,
    color: colors.white,
  },
  logo: {
    width: 105,
    height: 105,
  },
  loginContainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 60,
    gap: 4,
    zIndex: 2,
    height: "55%",
  },
  buttonLogin: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red.primary,
    width: "100%",
    height: 46,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonLoginText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fontFamily.semiBold,
  },
  loginActions: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  redirectRegister: {
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: "black",
  },
});
