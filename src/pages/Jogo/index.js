import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

export default function Jogo({ jogo, visible, closeModal }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.modalContent}>
          <View>
            {jogo && (
              <>
                <Image source={{ uri: jogo.imagem }} style={styles.itemImage} />
                <Text style={styles.modalTitle}>{jogo.titulo}</Text>
                <Text style={styles.text}>Categoria: {jogo.categoria}</Text>
                <Text style={styles.text}>Descrição: {jogo.descricao}</Text>
                <Text style={styles.text}>Nota: {jogo.avaliacao}</Text>
                <Text style={styles.text}>Preço: R${jogo.preco}</Text>
              </>
            )}
          </View>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#36363A",
    padding: 20,
    margin: 20,
    borderRadius: 8,
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#0277B5",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  itemImage: {
    width: "100%",
    height: "28%",
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});
