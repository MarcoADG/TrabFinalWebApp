import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/contexts/auth";
import RoutesStack from "./src/routes/StackNavigator";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";

export default function App() {
     useEffect(() => {
         const splashTimeout = setTimeout(() => {
        navigation.navigate('Gerenciamento');
   }, 3000); // Tempo em milissegundos (3 segundos neste exemplo)

    return () => clearTimeout(splashTimeout); // Limpar o timeout ao desmontar o componente
  }, []);
  
  const [isConnected, setIsConnected] = useState(true);

  // Efeito colateral para escutar as alterações na conexão à internet
  useEffect(() => {
    // Adiciona um ouvinte para atualizações de conexão
    const unsubscribe = NetInfo.addEventListener((state) => {
      // Atualiza o estado com o status atual da conexão
      setIsConnected(state.isConnected);
      Alert.alert(
        isConnected
          ? "Você está conectado à internet"
          : "Sem conexão com a internet!"
      );
    });

    // Função de limpeza que será executada quando o componente for desmontado
    return () => {
      // Remove o ouvinte para evitar vazamentos de memória.  Usubscribe é uma palavra usada em React para se referir à função de limpeza no useEffect.
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <AuthProvider>
        <RoutesStack />
      </AuthProvider>
    </NavigationContainer>
  );
}
