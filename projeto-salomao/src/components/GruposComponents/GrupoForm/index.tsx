import { SafeAreaView, Text, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { useState } from "react";
import Input from "@/components/Input";
import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { useEditarGrupo, useCadastrarGrupo } from "@/hooks/useGrupos";
import Toast from "react-native-toast-message";
import Loading from "@/components/Loading";
import { Feather } from "@expo/vector-icons";
import {Grupo} from "@/types/crismando"

import { styles } from "./styles";

const grupoSchema = z.object({
  nomeGrupo: z.string().min(2, { message: "Informe um nome válido" }),
});

type GrupoSchemaType = z.infer<typeof grupoSchema>;

type FormMode = "register" | "edit";

type Props = {
  initialData?: Grupo;
  mode: FormMode;
};

export default function GrupoForm({ initialData, mode }: Props) {
  const { control, handleSubmit } = useForm<GrupoSchemaType>({
    resolver: zodResolver(grupoSchema),
    mode: "onChange",
    criteriaMode: "all",
    shouldFocusError: true,
    defaultValues: initialData,
  });

  const { mutate: cadastrarGrupo, isPending: isPendingCadastro } =
    useCadastrarGrupo();
  const { mutate: editarGrupo, isPending: isPendingEdit } = useEditarGrupo();

  const router = useRouter();

  const onSubmit = async (data: GrupoSchemaType) => {
    if (mode === "register") {
      cadastrarGrupo(data, {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Grupo cadastrado com sucesso!",
            text2: `${data.nomeGrupo}`,
            position: "top",
            visibilityTime: 3000,
          });
          router.push("/(auth)/grupos");
        },
        onError: (error: any) => {
          console.error("Erro ao cadastrar grupo: ", error);

          const status = error.response?.status;
          const data = error.response?.data;

          console.log("Status:", status);
          console.log("Dados do erro:", data);

          Toast.show({
            type: "error",
            text1: "Erro ao cadastrar grupo!",
            position: "top",
            visibilityTime: 3000,
          });
        },
      });
    } else{
      editarGrupo({...data, _id: initialData?._id!}, {
         onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Grupo editador com sucesso!",
            text2: `${data.nomeGrupo}`,
            position: "top",
            visibilityTime: 3000,
          });
          router.push("/(auth)/grupos");
        },
        onError: (error: any) => {
          console.error("Erro ao cadastrar grupo: ", error);

          const status = error.response?.status;
          const data = error.response?.data;

          console.log("Status:", status);
          console.log("Dados do erro:", data);

          Toast.show({
            type: "error",
            text1: "Erro ao editar grupo!",
            position: "top",
            visibilityTime: 3000,
          });
        },
      })
    }
  };


  return (
    <View style={{ flex: 1 }}>
      {isPendingCadastro || isPendingEdit ? (
        <Loading isVisible={isPendingCadastro || isPendingEdit} />
      ) : (
        <View style={styles.container}>
          <View style={{ alignSelf: "flex-start", marginBottom: 10 }}>
            <Button
              style={{ width: 50 }}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={24} color="white" />
            </Button>
          </View>
          <Text style={styles.title}>{mode === "register" ? "Cadastrar grupo" : `Editar grupo: ${initialData?.nomeGrupo}`}</Text>
          <View style={styles.divider}></View>
          <View>
            <Input
              control={control}
              name="nomeGrupo"
              icon="folder"
              label="Nome do Grupo"
              inputProps={{
                placeholder: "Digite o nome do grupo...",
              }}
            />
          </View>
          <Button
            onPress={handleSubmit(onSubmit)}
            style={{ width: "100%" }}
            disabled={isPendingCadastro || isPendingEdit}
          >
            <Button.Title>{mode === "register" ? "Cadastrar" : "Editar"}</Button.Title>
          </Button>
        </View>
      )}
    </View>
  );
}
