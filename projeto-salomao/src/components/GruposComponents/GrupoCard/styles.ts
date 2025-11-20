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
  grupoButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
   
  },
  nomeGrupo: {
    fontFamily: fontFamily.bold,
    color: colors.black,
    fontSize: 16,
  },
});
