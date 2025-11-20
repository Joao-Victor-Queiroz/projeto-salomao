import { StyleSheet } from "react-native";
import { fontFamily, colors } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: colors.white,

  },

  cardContent: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    height: 40,
    gap: 6,
  },
  mainInfo:{
    flex: 1,
    alignItems: "flex-start"
  },
  nomeCrismando: {
    fontFamily: fontFamily.bold,
    color: colors.black,
    fontSize: 16,
  },
  idadeCrismando: {
    fontFamily: fontFamily.medium,
    color: colors.black,
    textAlign: "center",
    fontSize: 14,
  },
});
