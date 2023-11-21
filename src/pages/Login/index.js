import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input}/>
      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input}/>
      <TouchableOpacity>
        <Text style={styles.botao}>Entrar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    backgroundColor: "#1F1F24"
  },
  titulo:{

  },
  label:{

  },
  input:{

    backgroundColor: "#363640"
  },
  botao:{
    
    borderRadius: 10,
    backgroundColor: "#088DBC",
    color: "#f2f2f2",
    padding: 10,
    fontSize: 20,
    textAlign: "center"
  }
})

