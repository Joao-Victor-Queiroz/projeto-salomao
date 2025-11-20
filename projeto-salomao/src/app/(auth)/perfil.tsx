import { Text } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import ProfilePage from "@/components/Profile";

export default function Home() {
  return <ProfilePage />;
}
