import { StyleSheet } from "react-native";
import { fontFamily, colors } from "@/styles/theme";

export const styles = StyleSheet.create({
     modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    gap: 15,
    width: "100%"
  
  },
    title: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    color: colors.red.primary,
  },
  itemList:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 12,
    borderRadius: 8,
   borderWidth: 1,
  },
  itemContent:{
    flex: 1,
    flexDirection: "row",
    gap: 15,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleDataPagamento:{
    fontFamily: fontFamily.semiBold,
    fontSize: 14
  },
  emptyMessage:{
    fontFamily: fontFamily.bold,
    fontSize: 18,
  }
})