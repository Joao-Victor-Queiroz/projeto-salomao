import { StyleSheet, Dimensions } from "react-native";
import { fontFamily, colors } from "@/styles/theme";

const screenWidth = Dimensions.get("window").width;

const buttonWidth = screenWidth > 600 ? "48%" : "100%";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 44,
    gap: 25,
    marginTop: 10,

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
  actionsText: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
  },
  crismandoActions: {
    width: "100%",
    gap: 15,
  },
  crismandoActionButton: {
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
  crismandoActionButtonTitle: {},
  //   coupleButtons:{
  //   gap: 5,
  //   flexDirection: screenWidth > 600 ? 'row' : 'column',
  //   alignItems: "center",
  //   justifyContent: 'center',
  //   width: "100%"
  // },
  // buttonAction:{
  // width: buttonWidth
  // },
  nomeCrismando: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
  },
  basicInfo: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
  },
  section: {
    height: "auto",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    overflow: "hidden",
  },
  sectionTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 24,
    color: colors.white,
    backgroundColor: "black",
    width: "100%",
    textAlign: "center",
  },
  sectionContent: {
    padding: 10,
    backgroundColor: colors.white
  },
  sectionInfo: {
    flexDirection: "row",
  },
  infoTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: screenWidth > 600 ? 18 : 15,
  },
  infoContent: {
    fontFamily: fontFamily.regular,
    fontSize: screenWidth > 600 ? 18 : 15,
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
  // button: {
  //   width: "100%",
  //   backgroundColor: colors.red.primary,
  //   color: colors.white,
  //   borderRadius: 8,
  //   padding: 10,
  //   fontFamily: fontFamily.medium,
  // },
});
