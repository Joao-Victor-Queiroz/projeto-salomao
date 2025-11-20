import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function GrupoLayout() {
  const { isSignedIn } = useAuth();

   if (!isSignedIn) {
    return <Redirect href="/(public)/login" />;
  }

  return <Stack screenOptions={{ headerShown: false, animation: "slide_from_right" }} />;
}
