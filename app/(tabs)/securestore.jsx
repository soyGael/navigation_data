import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function App() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [retrievedValue, setRetrievedValue] = useState(null);

  const saveData = async () => {
    try {
      await SecureStore.setItemAsync(key, value);
      alert('Dato guardado exitosamente');
    } catch (error) {
      console.log('Error guardando el dato:', error);
    }
  };

  const getData = async () => {
    try {
      const result = await SecureStore.getItemAsync(key);
      if (result) {
        setRetrievedValue(result);
      } else {
        alert('Dato no encontrado');
      }
    } catch (error) {
      console.log('Error recuperando el dato:', error);
    }
  };

  const deleteData = async () => {
    try {
      await SecureStore.deleteItemAsync(key);
      alert('Dato eliminado exitosamente');
      setRetrievedValue(null);
    } catch (error) {
      console.log('Error eliminando el dato:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Secure Store Example</Text>
      <TextInput
        style={styles.input}
        placeholder="Clave"
        onChangeText={setKey}
        value={key}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        onChangeText={setValue}
        value={value}
      />
      <Button title="Guardar Dato" onPress={saveData} />
      <Button title="Recuperar Dato" onPress={getData} />
      <Button title="Eliminar Dato" onPress={deleteData} />
      {retrievedValue && <Text style={styles.result}>Valor Recuperado: {retrievedValue}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    color: 'green',
  },
});
