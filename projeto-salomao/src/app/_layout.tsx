import { Stack, Slot, useSegments, useRouter } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import Loading from "@/components/Loading";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useEffect } from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import {GestureHandlerRootView} from "react-native-gesture-handler"

import {colors, fontFamily} from "@/styles/theme";



const publishKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftWidth: 0, backgroundColor: colors.green, width: "90%"}}
      contentContainerStyle={{ paddingHorizontal: 15}}
      text1Style={{
        fontSize: 16,
        fontWeight: '400',
        fontFamily: fontFamily.medium,
        color: colors.white
      }}
      text2Style={{
        fontSize: 12, 
        fontFamily: fontFamily.regular,
        color: colors.white
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
       style={{borderLeftWidth: 0, backgroundColor: colors.red.third, width: "90%"}}
      text1Style={{
         fontSize: 14,
        fontWeight: '400',
        fontFamily: fontFamily.medium,
        color: colors.white
      }}
      text2Style={{
     fontSize: 12, 
        fontFamily: fontFamily.regular,
        color: colors.white
      }}
    />
  ),
}

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("isLoaded", isLoaded);
    console.log("isSignedIn", isSignedIn);
    console.log("segments", segments);
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";
    const currentPath = "/" + segments.join("/");

    if (isSignedIn && !inTabsGroup && currentPath !== "/perfil") {
      router.replace("/perfil");
    } else if (
      !isSignedIn &&
      currentPath !== "/login" &&
      currentPath !== "/register"
    ) {
      router.replace("/login");
    }
    console.log("isSignedIn", isSignedIn);
  }, [isLoaded, isSignedIn]);

  if(!isLoaded) return <Loading isVisible/>

  return <Stack screenOptions={{headerShown: false, animation:"slide_from_right"}}/>;
}

export default function RootLayoutNav() {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  if (!fontsLoaded) {
    return <Loading isVisible />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={publishKey!} tokenCache={tokenCache}>
          <InitialLayout />
          <Toast config={toastConfig}/>
        </ClerkProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
