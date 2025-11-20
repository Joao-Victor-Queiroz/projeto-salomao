import { StyleSheet } from "react-native";
import { fontFamily, colors } from "@/styles/theme";

export const styles = StyleSheet.create({
  logOutButton: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  logOutText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
  },
  profileContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 54,
    gap: 4,
    // justifyContent: "center",
    // alignItems: "center",
  },
  profileName: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
  },
  profileEmail:{
    fontFamily: fontFamily.regular,
    fontSize: 20,
  }
});
