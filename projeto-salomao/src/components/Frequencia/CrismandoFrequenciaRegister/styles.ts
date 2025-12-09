import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { fontFamily, colors } from "@/styles/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  nomeCrismando: {
    fontFamily: fontFamily.bold,
    fontSize: width > 600 ? 18 : 16,
  },
  statusButton: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 4,
    padding: 4,
    overflow: "hidden"
  },
  statusButtonSelected: {
    backgroundColor: "#3399FF",
    borderRadius: 4,
    padding: 4,
  },
  optionsContainer: {
    gap: 4,
  },
  buttonTextSelected: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontSize: width > 600 ? 18 : 16
  },
  buttonText: {
  fontFamily: fontFamily.medium,
   fontSize: width > 600 ? 18 : 16,
  },
  justificativaInput: {
    height: width > 600 ? 60  : 40,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 4,
    paddingHorizontal: 15,
    marginTop: 5,
    fontFamily: fontFamily.regular,
  }
});
