import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    tabbar:{
        flexDirection: "row",
        position: 'absolute',
        bottom: 55,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "white",
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: "black",
        shadowOffset:{width: 0, height: 10},
        shadowRadius: 10, 
        shadowOpacity: 0.1,
        elevation: 3,
    },
    tabbarItem:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    }
})