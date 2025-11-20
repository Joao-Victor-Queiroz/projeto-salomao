import { StyleSheet } from "react-native";
import { fontFamily } from "@/styles/theme";

const s = StyleSheet.create({
  // container: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   height: 56,
  //   width: "100%",
  //   overflow: "hidden",
  //   borderWidth: 1,
  //   borderColor: "red",
  //   borderRadius: 5,
  // },
  // icon: {
  //   height: 56,
  //   width: 56,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRightColor: "red",
  //   borderRightWidth: 2,
  // },
  // input: {
  //   flex: 1,
  //   paddingLeft: 16,
  //   fontSize: 14,
  // },
  // errorText:{
  //   color: "red",
  // }
  container: {
    width: "100%",
    marginBottom: 10,
  },
  labelInput: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: fontFamily.medium,
  },
  inputWrapper: {
    flexDirection: "row",
    borderRadius: 15,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    overflow: "hidden",
  },
  icon: {
    height: 56,
    width: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 2,
  },

  input: {
    flex: 1,
    paddingLeft: 16,
    fontFamily: fontFamily.light,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default s;
