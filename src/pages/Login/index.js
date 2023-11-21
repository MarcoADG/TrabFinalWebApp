import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import logo from "../../../assets/logo.png";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

export default function Login() {
  const [login, setLogin] = useState();
  const [senha, setSenha] = useState();

  function handleLogin() {
    signIn(login, senha);
  }

  const { signIn } = useContext(AuthContext);
  return (
    <ImageBackground
      source={require("../../../assets/background.gif")}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Image animation="flipInY" source={logo} style={styles.header} />
      </View>
      <View style={styles.form}>
        <Text style={styles.titulo}>Login</Text>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={login}
          onChangeText={(text) => setLogin(text)}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.botao}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F24",
  },
  titulo: { color: "#088DBC", fontSize: 30, textAlign: "center" },
  label: { color: "#088DBC", fontSize: 20 },
  input: {
    backgroundColor: "#363640",
    marginVertical: 10,
    height: 35,
    color: "white",
    paddingHorizontal: 10,
  },
  form: {
    flex: 1,
    backgroundColor: "#1f1f24",
    borderRadius: 25,
    padding: 50,
  },
  headerContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  botao: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#088DBC",
    color: "#f2f2f2",
    padding: 10,
    fontSize: 20,
    textAlign: "center",
  },
  header: {
    width: 250,
    height: 200,
  },
});
