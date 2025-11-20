import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { useState } from "react";
import {
  CrismandoSchemaType,
  crismandoSchema,
} from "@/schemas/crismandoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useRegistrarCrismando,
  useEditarCrismando,
} from "@/hooks/useCrismandos";
import Input from "@/components/Input";
import MaskInputs from "@/components/Input/MaskInput";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/Button";
import { styles } from "./styles";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import PermissaoNegada from "@/components/PermissaoNegada";
import { Feather } from "@expo/vector-icons";
import { Crismando } from "@/types/crismando";
import { colors } from "@/styles/theme";
import { formatToBrazilianDate } from "@/lib/formatToBrazilianDate";
import HeaderComponent from "@/components/HeaderComponent";
import Select from "@/components/Select";

type FormMode = "register" | "edit";

type Props = {
  mode: FormMode;
  initialData?: Crismando;
};

export default function CrismandoForm({ mode, initialData }: Props) {
  const { control, handleSubmit, watch, setValue } =
    useForm<CrismandoSchemaType>({
      resolver: zodResolver(crismandoSchema),
      mode: "onChange",
      defaultValues: initialData
        ? {
            ...initialData,
            dataNascimento: formatToBrazilianDate(initialData?.dataNascimento),
          }
        : {},
      criteriaMode: "all",
      shouldFocusError: true,
    });

  const ativo = watch("ativo");

  const { mutate: cadastrarCrismando, isPending } = useRegistrarCrismando();
  const { mutate: editarCrismando, isPending: isPendingEdit } =
    useEditarCrismando();
  console.log(initialData);

  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: CrismandoSchemaType) => {
    if (mode === "register") {
      cadastrarCrismando(data, {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Crismando cadastrado com sucesso!",
            text2: `${data.nomeCrismando} foi registrado(a).`,
            position: "top",
            visibilityTime: 3000,
          });
          router.push("/(auth)/crismandos");
        },
        onError: (err: any) => {
          console.error("Erro ao cadastrar crismando:", err);
          const status = err.response?.status;
          const data = err.response?.data;

          console.log("Status:", status);
          console.log("Dados do erro:", data);

          Toast.show({
            type: "error",
            text1: "Erro ao cadastrar crismando!",
            position: "top",
            visibilityTime: 3000,
          });
        },
      });
    } else {
      editarCrismando(
        { ...data, _id: initialData?._id!, ativo: ativo! },
        {
          onSuccess: () => {
            Toast.show({
              type: "success",
              text1: "Crismando editado com sucesso!",
              text2: `${data.nomeCrismando} foi editado.`,
              position: "top",
              visibilityTime: 3000,
            });
            router.push("/(auth)/crismandos");
            console.log("Crismando editado com sucesso: ", data);
          },
          onError: (err: any) => {
            console.error("Erro ao editar crismando:", err);
            const status = err.response?.status;
            const data = err.response?.data;

            console.log("Status:", status);
            console.log("Dados do erro:", data);

            Toast.show({
              type: "error",
              text1: "Erro ao editar crismando!",
              position: "top",
              visibilityTime: 3000,
            });
          },
        }
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          {isPending || isPendingEdit ? (
            <Loading isVisible={isPending || isPendingEdit} />
          ) : (
            <View style={styles.container}>
              <HeaderComponent
                title={
                  mode === "edit"
                    ? `Edição: ${initialData?.nomeCrismando}`
                    : "Registro de Crismando(a)"
                }
                onPressBack={() => router.back()}
              />
              {mode === "edit" && (
                <View style={styles.crismandoAtivo}>
                  <Text style={styles.labelCrismandoAtivo}>
                    Crismando ativo?
                  </Text>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <Pressable
                      onPress={() => setValue("ativo", true)}
                      style={[
                        styles.botaoCrismandoAtivo,
                        ativo && { backgroundColor: colors.red.third },
                      ]}
                    >
                      <Text
                        style={[
                          styles.textoBotaoCrismandoAtivo,
                          ativo && { color: colors.white },
                        ]}
                      >
                        Ativo
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setValue("ativo", false)}
                      style={[
                        styles.botaoCrismandoAtivo,
                        !ativo && { backgroundColor: colors.red.third },
                      ]}
                    >
                      <Text
                        style={[
                          styles.textoBotaoCrismandoAtivo,
                          !ativo && { color: colors.white },
                        ]}
                      >
                        Inativo
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}

              <View style={styles.sectionForm}>
                <Text style={styles.sectionTitle}>Dados Pessoais</Text>

                <Input
                  label="Nome do(a) crismando(a)"
                  icon="user"
                  name="nomeCrismando"
                  control={control}
                  rules={{ required: "Este campo é obrigatório!" }}
                  inputProps={{
                    placeholder: "Digite o nome do(a) crismando(a)",
                    autoCapitalize: "words"
                  }}
                />

                <Input
                  label="RG do(a) crismando(a)"
                  icon="file-text"
                  name="rg"
                  control={control}
                  inputProps={{ placeholder: "Digite o RG" }}
                />
                <Input
                  label="Órgão Expedidor"
                  icon="file-text"
                  name="orgaoExpedidor"
                  control={control}
                  inputProps={{ placeholder: "Digite o Órgão Expedidor" }}
                />

                <Input
                  label="Idade"
                  icon="triangle"
                  name="idade"
                  control={control}
                  inputProps={{ placeholder: "Digite a idade" }}
                />
                <MaskInputs
                  label="Data de Nascimento"
                  icon="calendar"
                  name="dataNascimento"
                  control={control}
                  maskType="data"
                />
                <Input
                  label="Cidade de Nascimento"
                  icon="map-pin"
                  name="cidadeNascimento"
                  control={control}
                  inputProps={{ placeholder: "Digite a cidade de nascimento" }}
                />
                <Input
                  label="UF da Cidade"
                  icon="map-pin"
                  name="estadoDaCidade"
                  control={control}
                  inputProps={{ placeholder: "UF da cidade de nascimento" }}
                />
                <Input
                  label="Endereço"
                  icon="map-pin"
                  name="endereco"
                  control={control}
                  inputProps={{ placeholder: "Digite o endereço " }}
                />
                <Input
                  label="Número do Endereço"
                  icon="map-pin"
                  name="numEndereco"
                  control={control}
                  inputProps={{ placeholder: "Digite o número do endereço" }}
                />
                <Input
                  label="Complemento"
                  icon="map-pin"
                  name="complemento"
                  control={control}
                  inputProps={{
                    placeholder: "Digite o complemento do endereço",
                  }}
                />
                <Input
                  label="Cidade de Moradia"
                  icon="home"
                  name="cidadeMoradia"
                  control={control}
                  inputProps={{ placeholder: "Informe a cidade onde mora" }}
                />
                <Input
                  label="Bairro"
                  icon="home"
                  name="bairro"
                  control={control}
                  inputProps={{ placeholder: "Informe o bairro" }}
                />

                <MaskInputs
                  label="CEP"
                  icon="home"
                  name="cep"
                  control={control}
                  maskType="cep"
                />

                <MaskInputs
                  label="Telefone do(a) Crismando(a)"
                  icon="smartphone"
                  name="telefoneCrismando"
                  control={control}
                  maskType="telefone"
                />
              </View>
              <View style={styles.sectionForm}>
                <Text style={styles.sectionTitle}>Filiação</Text>
                <Input
                  label="Nome do Pai"
                  icon="user"
                  name="nomePai"
                  control={control}
                  inputProps={{
                    placeholder: "Digite o nome do Pai do crismando",
                  }}
                />
                <Input
                  label="Nome da Mãe"
                  icon="user"
                  name="nomeMae"
                  control={control}
                  inputProps={{
                    placeholder: "Digite o nome da Mãe do crismando",
                  }}
                />
                <MaskInputs
                  label="Telefone do Pai"
                  icon="smartphone"
                  name="telefonePai"
                  control={control}
                  maskType="telefone"
                />
                <MaskInputs
                  label="Telefone da Mãe"
                  icon="smartphone"
                  name="telefoneMae"
                  control={control}
                  maskType="telefone"
                />
              </View>
              <View style={styles.sectionForm}>
                <Text style={styles.sectionTitle}>Dados do Cristão</Text>
                <Select 
                  label="É Batizado?"
                  name="batizado"
                  icon="book"
                  control={control}
                  disabled={false}
                  placeholder="Selecione a opção..."
                  options={[
                    {label: "Sim", value:"Sim" },
                    {label: "Não", value:"Não"}
                  ]}
                />
                    <Select 
                  label="Fez Primeira Eucaristia?"
                  name="primeiraEucaristia"
                  icon="book"
                  control={control}
                  disabled={false}
                  placeholder="Selecione a opção..."
                  options={[
                    {label: "Sim", value:"Sim" },
                    {label: "Não", value:"Não"}
                  ]}
                />
                <Input
                  label="Por que o crismando quer fazer crisma?"
                  icon="book"
                  name="justificativa"
                  control={control}
                  inputProps={{
                    placeholder: "Escreva aqui o motivo",
                    multiline: true,
                    numberOfLines: 4
                  }}
                />
              </View>
              <Button
                onPress={handleSubmit(onSubmit)}
                style={{ width: "100%" }}
                disabled={isPending || isPendingEdit}
              >
                <Button.Title>
                  {mode === "register" ? "Cadastrar" : "Editar"}
                </Button.Title>
              </Button>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <PermissaoNegada
        isVisible={modalVisible}
        descricao="CADASTRAR CRISMANDO"
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
