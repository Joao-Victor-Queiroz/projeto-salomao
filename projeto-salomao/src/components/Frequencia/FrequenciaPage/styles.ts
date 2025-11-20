import { StyleSheet } from "react-native"
import { colors, fontFamily } from "@/styles/theme"

export const styles =  StyleSheet.create({
    container:{
      padding: 24,
    },
    statusButton:{
   borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 4,
    padding: 4,
    overflow: "hidden"
    },
    statusOptions:{
      marginVertical: 14,
      gap: 8,
    },
    selectedStatusButton:{
  backgroundColor: "#3399FF",
    borderRadius: 4,
    padding: 4,
    },
      buttonTextSelected: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    fontSize: 16
  },
  buttonText: {
  fontFamily: fontFamily.medium,
   fontSize: 16,
  },
})