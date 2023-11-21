import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext({});
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  function signIn(login, senha) {
    if (login == "Admin" && senha == "Admin") {
      navigation.navigate("Routes");
    } else {
      Alert.alert("login ou senha errados");
    }
  }

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
}
