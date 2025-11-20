import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons"; 
import { Controller } from "react-hook-form";
import clsx from "clsx";
import { fontFamily } from "@/styles/theme"; 

import {s} from "./styles"


type Option = {
  label: string;
  value: any;
};


type SelectProps = {
  icon: keyof typeof Feather.glyphMap;
  name: string;
  label?: string;
  control: any;
  rules?: object;
  disabled?: boolean;
  options: Option[];
  placeholder?: string;
};

export default function Select({
  icon,
  name,
  label,
  control,
  rules,
  disabled,
  options,
  placeholder = "Selecione...",
}: SelectProps) {
  
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={disabled}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        
        const color = clsx({
          "#E63946": error,
          black: value && !error,
          "#8d8d99": !value,
        });

       
        const selectedOption = options.find(
          (option) => option.value === value
        );

        return (
          <View style={s.container}>
           
            <Text style={s.labelInput}>{label}</Text>

          
            <View style={[s.inputWrapper, { borderColor: color }]}>
            
              <View style={[s.icon, { borderRightColor: color }]}>
                <Feather name={icon} size={24} color={color} />
              </View>

             
              <TouchableOpacity
                style={[s.input, { justifyContent: "center" }]} 
                onPress={() => !disabled && setModalVisible(true)}
                disabled={disabled}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.light,
                    color: selectedOption ? "black" : "#8d8d99", 
                  }}
                >
                  {selectedOption?.label || placeholder}
                </Text>
              </TouchableOpacity>

              
              <View style={[s.iconToggle]}>
                <Feather name="chevron-down" size={24} color={color} />
              </View>
            </View>

       
            {error && <Text style={s.errorText}>{error?.message || ""}</Text>}

            <Modal
              transparent={true}
              visible={modalVisible}
              animationType="fade"
              onRequestClose={() => setModalVisible(false)}
            >
          
              <Pressable
                style={s.modalBackdrop}
                onPress={() => {
                  setModalVisible(false);
                  onBlur(); 
                }}
              >
             
                <View
                  style={s.modalContent}
                  onStartShouldSetResponder={() => true}
                >
                  <FlatList
                    data={options}
                    keyExtractor={(item) => String(item.value)}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={s.optionItem}
                        onPress={() => {
                          onChange(item.value); 
                          setModalVisible(false); 
                          onBlur();
                        }}
                      >
                        <Text style={s.optionLabel}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </Pressable>
            </Modal>
          </View>
        );
      }}
    />
  );
}