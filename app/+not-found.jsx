import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemedText } from './components/ThemedText'; // assure-toi de bien importer ThemedText
import { ThemedView } from './components/ThemedView'; // assure-toi de bien importer ThemedView

export default function NotFoundScreen() {
  const navigation = useNavigation();

  const goHome = () => {
    navigation.navigate('Home'); // Ajuste le nom du screen si nécessaire
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This screen does not exist.</ThemedText>
      <TouchableOpacity onPress={goHome} style={styles.link}>
        <ThemedText type="link">Go to home screen!</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
