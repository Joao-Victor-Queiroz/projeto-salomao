import { StyleSheet, Dimensions } from "react-native";
import { fontFamily } from "@/styles/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  message: {
    marginBottom: 12,
    textAlign: "center",
    fontSize: width > 600 ? 20 : 16,
    color: "red",
    fontFamily: fontFamily.medium,
  },
});
