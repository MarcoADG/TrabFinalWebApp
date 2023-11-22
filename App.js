import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/contexts/auth";
import RoutesStack from "./src/routes/StackNavigator";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RoutesStack />
      </AuthProvider>
    </NavigationContainer>
  );
}
