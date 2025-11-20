import { StyleSheet } from "react-native";
import { fontFamily, colors } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginTop: 20,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: colors.red.third,
  },
});
