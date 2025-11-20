import { StyleSheet } from "react-native";
import { fontFamily } from "@/styles/theme";

const s = StyleSheet.create({
  // --- Seus estilos existentes ---
  container: {
    width: "100%",
    marginBottom: 10,
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
  labelInput: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 5,
    fontFamily: fontFamily.medium,
  },
  input: {
    flex: 1,
    paddingLeft: 16,
    fontFamily: fontFamily.light,
    // Adicionado justifyContent: 'center' diretamente no componente
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  iconToggle: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  // --- NOVOS ESTILOS PARA O MODAL ---
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    width: "80%", // Você pode ajustar isso
    maxHeight: "50%", // Evita que a lista fique muito grande
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: fontFamily.medium, // Usei a fonte do seu label
    textAlign: "center",
  },
});

export {s};