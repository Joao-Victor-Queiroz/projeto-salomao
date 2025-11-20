import { useUser, useAuth } from "@clerk/clerk-expo";
import { View, Text, SafeAreaView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Loading from "../Loading";

import { styles } from "./styles";

export default function ProfilePage() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>();

  const handleLogOut = () => {
    setIsLoading(true);
    try {
      signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading isVisible={isLoading} />;
  }

  return (
    <SafeAreaView style={styles.profileContent}>
      <Pressable onPress={handleLogOut} style={styles.logOutButton}>
        <Text style={styles.logOutText}>Sair</Text>
        <Ionicons name="log-out-outline" size={24} color="black" />
      </Pressable>
      <View>
        <Text style={styles.profileName}>Olá, {user?.firstName}</Text>
        <Text style={styles.profileEmail}>
          {user?.emailAddresses[0].emailAddress}
        </Text>
         <Text style={styles.profileEmail}>
          Cargo: {user?.publicMetadata?.cargo as string || "Cargo não definido"}
        </Text>
      </View>
    </SafeAreaView>
  );
}
