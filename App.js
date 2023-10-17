import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function App() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    // URL de la API de Marvel para obtener cómics
    const apiUrl = 'https://gateway.marvel.com/v1/public/comics';

    // Tus credenciales de desarrollador de Marvel
    const publicKey = '7f705b501d905682fecd3da24243a0f2';
    const privateKey = 'fac5751b303f80bd6f4ad15f015a124415d8f02b';

    // Obtén un timestamp actual
    const timestamp = new Date().getTime().toString();

    // Genera un hash utilizando la clave privada y el timestamp
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

    // Configura las solicitudes a la API de Marvel con las credenciales
    const config = {
      params: {
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
      },
    };

    // Realiza una solicitud GET a la API de Marvel para obtener cómics
    axios.get(apiUrl, config)
      .then(response => {
        setComics(response.data.data.results);
      })
      .catch(error => {
        console.error('Error fetching comics data:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cómics de Marvel:</Text>
      <FlatList
        data={comics}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.comicContainer}>
            <Text style={styles.comicTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  comicContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  comicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
