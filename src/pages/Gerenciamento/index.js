import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import logo from "../../../assets/logo.png";

export default function Gerenciamento() {
  const [jogos, setJogos] = useState([]);
  const [selectedJogo, setSelectedJogo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedJogo, setEditedJogo] = useState({
    id: null,
    titulo: "",
    categoria: "",
    imagem: "",
    descricao: "",
    preco: 0,
    avaliacao: 0,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadJogos();
  }, []);

  const loadJogos = async () => {
    try {
      const response = await axios.get(
        "https://6542c2c301b5e279de1f8b80.mockapi.io/jogos"
      );
      setJogos([
        { id: "addButton", titulo: "Adicione um jogo" },
        ...response.data,
      ]);
    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
    }
  };

  const openModal = (jogo) => {
    if (jogo.id === "addButton") {
      setEditedJogo({
        id: null,
        titulo: "",
        categoria: "",
        imagem: "",
        descricao: "",
        preco: "",
        avaliacao: "",
      });
    } else {
      setSelectedJogo(jogo);
      setEditedJogo(jogo);
    }
    setFormErrors({});
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedJogo(null);
    setFormErrors({});
    setModalVisible(false);
    loadJogos();
  };

  const deleteJogo = async (id) => {
    try {
      await axios.delete(
        `https://6542c2c301b5e279de1f8b80.mockapi.io/jogos/${id}`
      );
      loadJogos();
      closeModal();
    } catch (error) {
      console.error("Erro ao excluir jogo:", error);
    }
  };

  const saveChanges = async () => {
    try {
      const errors = validateForm();

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      if (editedJogo.id) {
        await axios.put(
          `https://6542c2c301b5e279de1f8b80.mockapi.io/jogos/${editedJogo.id}`,
          editedJogo
        );
      } else {
        const response = await axios.post(
          "https://6542c2c301b5e279de1f8b80.mockapi.io/jogos",
          editedJogo
        );
        setJogos((prevJogos) => [...prevJogos, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!editedJogo.titulo || editedJogo.titulo.trim() === "") {
      errors.titulo = "Título é obrigatório";
    }
    if (!editedJogo.categoria || editedJogo.categoria.trim() === "") {
      errors.categoria = "Categoria é obrigatória";
    }
    if (!editedJogo.descricao || editedJogo.descricao.trim() === "") {
      errors.descricao = "Descrição é obrigatória";
    }
    if (isNaN(parseFloat(editedJogo.preco))) {
      errors.preco = "Preço inválido";
    }
    if (isNaN(parseFloat(editedJogo.avaliacao))) {
      errors.avaliacao = "Avaliação inválida";
    }
    return errors;
  };

  const renderItem = ({ item }) => {
    if (item.id === "addButton") {
      return (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => openModal(item)}
        >
          <Text style={styles.addButtonText}>{item.titulo}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
          <View style={styles.itemContainer}>
            <View>
              <Image source={{ uri: item.imagem }} style={styles.itemImage} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.titulo}</Text>
              <View style={styles.iconsContainer}>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color="#3498db"
                  style={styles.icon}
                  onPress={() => openModal(item)}
                />
                <Ionicons
                  name="trash-outline"
                  size={24}
                  color="#e74c3c"
                  style={styles.icon}
                  onPress={() => deleteJogo(item.id)}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const handleInputChange = (field, value) => {
    setEditedJogo((prevJogo) => ({
      ...prevJogo,
      [field]: isNaN(value) ? "" : value,
    }));
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.header} />
      <FlatList
        data={jogos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modelText}>Titulo</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={editedJogo.titulo}
              onChangeText={(text) => handleInputChange("titulo", text)}
            />
            {formErrors.titulo && (
              <Text style={styles.errorText}>{formErrors.titulo}</Text>
            )}
            <Text style={styles.modelText}>Categoria</Text>
            <TextInput
              style={styles.input}
              placeholder="Categoria"
              value={editedJogo.categoria}
              onChangeText={(text) => handleInputChange("categoria", text)}
            />
            {formErrors.categoria && (
              <Text style={styles.errorText}>{formErrors.categoria}</Text>
            )}
            <Text style={styles.modelText}>link Imagem</Text>
            <TextInput
              style={styles.input}
              placeholder="Imagem (URL)"
              value={editedJogo.imagem}
              onChangeText={(text) => handleInputChange("imagem", text)}
            />
            <Text style={styles.modelText}>Descrição</Text>
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={editedJogo.descricao}
              onChangeText={(text) => handleInputChange("descricao", text)}
            />
            {formErrors.descricao && (
              <Text style={styles.errorText}>{formErrors.descricao}</Text>
            )}
            <Text style={styles.modelText}>Preço</Text>
            <TextInput
              style={styles.input}
              placeholder="Preço"
              returnKeyType="done"
              value={editedJogo.preco.toString()}
              onChangeText={(text) => handleInputChange("preco", text)}
            />
            {formErrors.preco && (
              <Text style={styles.errorText}>{formErrors.preco}</Text>
            )}
            <Text style={styles.modelText}>Avaliação</Text>
            <TextInput
              style={styles.input}
              placeholder="Avaliação"
              returnKeyType="done"
              value={editedJogo.avaliacao.toString()}
              onChangeText={(text) => handleInputChange("avaliacao", text)}
            />
            {formErrors.avaliacao && (
              <Text style={styles.errorText}>{formErrors.avaliacao}</Text>
            )}
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={saveChanges}
              >
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F24",
    padding: 16,
    alignItems: "center",
  },
  item: {
    backgroundColor: "#36363A",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  modelText: {
    color: "#fff",
    fontSize: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  icon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#36363A",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: "#fff",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  header: {
    width: 150,
    height: 100,
  },
  modalButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  addButton: {
    backgroundColor: "#27ae60",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 10,
  },
});
