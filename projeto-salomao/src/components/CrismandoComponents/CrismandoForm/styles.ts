import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginTop: 20,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 64,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
  },
  labelCrismandoAtivo:{
    fontSize: 20,
    fontFamily: fontFamily.semiBold
  },
  crismandoAtivo:{
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%"
  },
  botaoCrismandoAtivo:{
    backgroundColor: colors.gray[200],
    padding: 12, 
    borderRadius: 8,
    width: "40%"
  },
  textoBotaoCrismandoAtivo:{
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: colors.red.third,
  },
  sectionForm: {
    gap: 0,
  },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
    marginBottom: 10,
   
  },
});
