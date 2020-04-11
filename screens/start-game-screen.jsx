import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import Colors from "../constants/colors";
import Card from "../components/card.component";
import Input from "../components/input.component";
import NumberContainer from "../components/number-container.component";

const StartGameScreen = ({ startGame }) => {
  const [enteredValue, setEnteredValue] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  const [selectedNumber, setSelectedNumber] = useState();

  const handleNumberInput = (nextInput) => {
    setEnteredValue(nextInput.replace(/[^0-9]/g, ""));
  };

  const handleResetInput = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const handleConfirmInput = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber < 1 || chosenNumber > 99) {
      Alert.alert("Invalid number!", "Number has to be between 0 and 99", [
        { text: "Okay", style: "destructive", onPress: handleResetInput },
      ]);

      return;
    }
    setConfirmed(true);
    setSelectedNumber(parseInt(chosenNumber));
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>Chosen Number</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="START GAME"
          onPress={startGame.bind(this, selectedNumber)}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start A New Game!</Text>
        <Card style={{ ...styles.inputContainer }}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={handleNumberInput}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={handleResetInput}
                color={Colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                x
                title="Confirm"
                onPress={handleConfirmInput}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: "40%",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
