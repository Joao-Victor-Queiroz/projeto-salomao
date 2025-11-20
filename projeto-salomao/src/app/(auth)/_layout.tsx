import { Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import MyTabBar from "@/components/TabBar";

// export const LogoutButton = () => {
//   const { signOut } = useAuth();

//   const doLogout = () => {
//     signOut();
//   };

//   return (
//     <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
//       <Ionicons name="log-out-outline" size={24} color="#fff" />
//     </Pressable>
//   );
// };

export default function TabsPages() {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{headerShown: false, animation: "shift"}}
    >
      <Tabs.Screen name="crismandos"  options={{title: "Crismandos"}} redirect={!isSignedIn}  />
      <Tabs.Screen name="grupos" options={{title: "Grupos"}} redirect={!isSignedIn} />
      <Tabs.Screen name="perfil"  options={{title: "Perfil"}} redirect={!isSignedIn} />
    </Tabs> 
  );
}
