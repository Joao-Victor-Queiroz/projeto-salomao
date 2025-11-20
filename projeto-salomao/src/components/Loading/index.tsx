import { View } from "react-native";
import LottieView from "lottie-react-native";

import styles from "./styles";

interface LoadingProps {
  isVisible: boolean;
}

export default function Loading({ isVisible }: LoadingProps) {
  if (!isVisible) return null;
  return (
    <View style={styles.container}>
      {isVisible && (
        <LottieView
          source={require("@/assets/birdAnimation")}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
      )}
    </View>
  );
}
