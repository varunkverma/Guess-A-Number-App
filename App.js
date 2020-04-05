import React from "react";
import { StyleSheet, View } from "react-native";

import StartGameScreen from "./screens/start-game-screen";
import Header from "./components/header.component";

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
