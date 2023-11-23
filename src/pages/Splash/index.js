import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      navigation.navigate("BemVindo");
    }, 3000); // Tempo em milissegundos (3 segundos neste exemplo)

    return () => clearTimeout(splashTimeout); // Limpar o timeout ao desmontar o componente
  }, []);

  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#152747" }}
    >
      <LottieView
        source={require("../../../assets/Animation.json")}
        autoPlay
        loop={false}
        speed={1.0}
        onAnimationFinish={() => navigation.navigate("BemVindo")}
      />
    </View>
  );
}
