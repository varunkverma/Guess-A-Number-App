import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Header from "./components/header.component";
import StartGameScreen from "./screens/start-game-screen";
import GameScreen from "./screens/game-screen";
import GameOverScreen from "./screens/game-over-screen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  const handleStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const handleGameOver = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen startGame={handleStartGame} />;
  if (userNumber && guessRounds < 1) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={handleGameOver} />
    );
  } else if (guessRounds > 0) {
    content = <GameOverScreen />;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
