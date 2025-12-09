import {
  View,
  TouchableOpacityProps,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Controller, useWatch } from "react-hook-form";

import { Crismando } from "@/types/crismando";
import { styles } from "./styles";
import { pegarPrimeiroEUltimoNome } from "@/lib/firstAndLastName";


type Props = TouchableOpacityProps & {
  index: number;
  control: any;
  nomeCrismando: string;
}

export default function CrismandoFrequenciaRegister({index, control, nomeCrismando} : Props){


  const options = [
    { label: "Presente", value: "P" },
    { label: "Falta Justificada", value: "FJ" },
    { label: "Falta Não Justificada", value: "FNJ" },
  ];

  const statusAtual = useWatch({
    control,
    name: `frequencias.${index}.status`
  })

  return(
    <View style={styles.container}>
      <Text style={styles.nomeCrismando}>{nomeCrismando}</Text>
       <Controller 
        control={control}
        name={`frequencias.${index}.status`}
        render={({field: {onChange, value}}) => {
          return (
           <View style={styles.optionsContainer}>
              {options.map((option) => {

                const isSelected = value === option.value

                return(
                  <TouchableOpacity style={isSelected ? styles.statusButtonSelected : styles.statusButton} key={option.value} onPress={() => onChange(option.value) }>
                    <Text style = {isSelected ? styles.buttonTextSelected : styles.buttonText}>{option.label}</Text>
                  </TouchableOpacity>
                )
            })}
            </View>
            )
          }}
        />
        {statusAtual === "FJ" && (
           <Controller 
              control={control}
              name={`frequencias.${index}.justificativa`}
              render={({field: {onChange, value}}) => (
              <TextInput 
                placeholder="Digite a justificativa"
                value={value}
                onChangeText={onChange}
                style={styles.justificativaInput}
              />
             )}
            />
        )}
    </View>
  )
}