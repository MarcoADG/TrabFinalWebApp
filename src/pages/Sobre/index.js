import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import logo from "../../../assets/logo.png";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

export default function Sobre() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usernames = [
          "Rofogale",
          "Cintiaaaa",
          "leignel",
          "lucascaiafa00",
          "RafaelVPL",
        ];
        const usersPromises = usernames.map(async (username) => {
          try {
            const response = await axios.get(
              `https://api.github.com/users/${username}`
            );
            return response.data;
          } catch (userError) {
            console.error(`Error fetching data for ${username}:`, userError);
            return null;
          }
        });

        const users = await Promise.all(usersPromises);
        setUsersData(users.filter((user) => user !== null));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderHeader = () => (
    <View style={styles.caixasTexto}>
      <Text style={styles.pixeltext}>SOBRE</Text>
      <Text style={styles.texto}>
        Os visionários fundadores da Game Hub, apaixonados pelo universo dos
        jogos, uniram suas mentes criativas para criar uma experiência única de
        compra. Com determinação e expertise, eles transformaram a Game Hub em
        um destacado e-commerce de jogos. Inspirados pela inovação e dedicação
        aos gamers, esses líderes comprometidos criaram um espaço onde a paixão
        pelos jogos se encontra com a excelência em oferecer as melhores opções
        para a comunidade gamer.
      </Text>
      <Text style={styles.pixeltext}>Nossos Fundadores</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
        <Text style={styles.texto2}>{item.login}</Text>
        <TouchableOpacity>
          <AntDesign name="linkedin-square" color={"lightblue"} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`https://github.com/${item.login}`)}
        >
          <AntDesign name="github" color={"white"} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.caixasTexto}>
        <Image source={logo} style={styles.header} />
      </View>
      <FlatList
        data={usersData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F24",
    padding: 12,
  },
  caixasTexto: {
    alignItems: "center",
  },
  header: {
    width: 150,
    height: 100,
  },
  pixeltext: {
    color: "#088DBC",
    fontSize: 20,
    marginVertical: 10,
  },
  texto: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  texto2: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  avatar: {
    width: 100,
    height: 100,
  },
  item: {
    marginVertical: 8,
    paddingRight: 20,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
