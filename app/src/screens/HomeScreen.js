import React from 'react';
import { View, Text, StyleSheet, StatusBar} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <StatusBar barStyle="dark-content" backgroundColor="orange" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'plum',
  },
});
