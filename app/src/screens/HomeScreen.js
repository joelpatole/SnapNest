import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import * as Font from 'expo-font';

export default function HomeScreen() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Allura-Regular': require('../../internal_assets/internal_fonts/Allura-Regular.ttf'),
      });
      setFontLoaded(true);
    }

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Home Screen</Text>
      </View>
      <StatusBar barStyle="light-content" backgroundColor="#481f8aff" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9e95e5ff',
  },
  text: {
    fontFamily: 'Allura-Regular',
    fontSize: 24,
  }
});