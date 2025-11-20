import { colors } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 34,
    gap: 10,
  },
  pesquisaCrismandos: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    width: "80%",
    borderRadius: 10,
   paddingLeft: 10,
   flexDirection: "row",
   justifyContent: "flex-start",
   alignItems: "center",
   backgroundColor: colors.white
  },
  actions:{
    flexDirection: "row",
    gap: 2,
    width: "100%"
  }
});
