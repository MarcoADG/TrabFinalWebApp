import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Jogo from "../Jogo"; // Importe a página Jogo
import logo from "../../../assets/logo.png";
import Feather from "react-native-vector-icons/Feather";

const windowWidth = Dimensions.get("window").width;

export default function Lista() {
  const url = "https://6542c2c301b5e279de1f8b80.mockapi.io/jogos";
  const [jogos, setJogos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedJogo, setSelectedJogo] = useState(null);

  const getJogos = async () => {
    try {
      const { data } = await axios.get(url);
      setJogos(data);
    } catch (error) {
      console.error("Erro ao obter jogos:", error);
    }
  };

  useEffect(() => {
    getJogos();
  }, []);

  const openModal = (jogo) => {
    setSelectedJogo(jogo);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => openModal(item)}>
        <Image source={{ uri: item.imagem }} style={styles.itemImage} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.header} />
      <TouchableOpacity onPress={getJogos}>
        <Feather name="refresh-ccw" color={"white"} size={30} />
      </TouchableOpacity>
      <FlatList
        data={jogos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
      />

      <Jogo
        jogo={selectedJogo}
        visible={modalVisible}
        closeModal={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F24",
    alignItems: "center",
  },
  header: {
    width: 150,
    height: 100,
  },
  item: {
    backgroundColor: "#36363A",
    borderRadius: 8,
    overflow: "hidden",
    margin: 4,
    width: windowWidth / 2 - 12,
    height: 150,
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
});
