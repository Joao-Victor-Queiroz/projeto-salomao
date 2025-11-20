import { StyleSheet, Dimensions} from "react-native";
import { fontFamily, colors } from "@/styles/theme";

const screenWidth = Dimensions.get('window').width

const buttonWidth = screenWidth > 600 ? "48%" : "100%";



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    paddingBottom: 44,
    paddingHorizontal: 20,
    gap: 10,
  },
  valorTotalPago: {
    fontFamily: fontFamily.semiBold,
    fontSize: 18
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  actionsText:{
   fontSize: 15,
    fontFamily: fontFamily.semiBold,
  },
   grupoActions: {
    width: "100%",
    gap: 15,
  },
  grupoActionButton: {
    backgroundColor: colors.white,
    color: "black",
    width: "100%",
      shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  coupleButtons:{
    gap: 5,
    flexDirection: screenWidth > 600 ? 'row' : 'column',
    alignItems: "center",
    justifyContent: 'center',
    width: "100%"
  },
  buttonAction:{
  width: buttonWidth
  },
  nomeGrupo: {
    fontFamily: fontFamily.bold,
    fontSize: screenWidth > 600 ? 34 : 28,
    textAlign: 'center'
  },
  sectionTitle:{
    fontFamily: fontFamily.semiBold,
    fontSize: screenWidth > 600 ? 28 : 24,
    textAlign: 'center',
    marginTop: 12,
  },
  crismando:{
    flexDirection: 'row',
    width: "100%",
    justifyContent: "space-around",
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gray[300],
    padding: 10,
    borderRadius: 8,
  },
  crismandosGrupo:{
    width: "100%",
    gap: 10,
    paddingBottom: 60,
  },
  nomeCrismando:{
    fontFamily: fontFamily.semiBold,
    fontSize: screenWidth > 600 ? 20 : 16
  },
  isEmpty: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    textAlign: 'center',
  },
   removerButton:{
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    borderColor: colors.red.primary,
    borderWidth: 1,
    borderRadius: 8,
   padding: 10,
  },
  removerButtonText:{
    color: colors.red.primary,
    fontFamily: fontFamily.bold,
    fontSize: 16,
  }
});
