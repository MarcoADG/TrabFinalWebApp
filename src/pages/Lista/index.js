import { View, Text, StyleSheet } from "react-native";
import api from "../../../services/api";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Lista() {
  const url = "https://6542c2c301b5e279de1f8b80.mockapi.io/jogos";
  const [jogos, setJogos] = useState([]);

  const getJogos = async () => {
    try {
      const { data } = await axios.get(url);
      console.log(data);
      setJogos(data);
    } catch (error) {}
  };

  useEffect(() => {
    getJogos();
  }, []);

  // const item = ({item}) => (<View style={styles.item}><Image
  //           source={{data.imagem}}
  //           style={{ width: 50, height: 50 }}
  //         /></View>)
  return (
    <View style={styles.container}>
      <Text>Lista</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F24",
  },
});
