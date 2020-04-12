import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import Colors from "../constants/colors";
import Card from "../components/card.component";
import Input from "../components/input.component";
import TitleText from "../components/title-text.component";
import BodyText from "../components/body-text.component";
import NumberContainer from "../components/number-container.component";
import MainButton from "../components/main-button.component";

const StartGameScreen = ({ startGame }) => {
  const [enteredValue, setEnteredValue] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  const [selectedNumber, setSelectedNumber] = useState();

  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  const handleNumberInput = (nextInput) => {
    setEnteredValue(nextInput.replace(/[^0-9]/g, ""));
  };

  useEffect(() => {
    // to re-evaluate the height and width fro styling purpose when orientation changes i.e., Potrait <--> Landscape
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    // Event listener for orientation change
    Dimensions.addEventListener("change", updateLayout);

    // clean up function, to clean the old actionListener
    return () => {
      Dimensions.addEventListener("change", updateLayout);
    };
  });

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
        <BodyText>Chosen Number</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={startGame.bind(this, selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start A New Game!</TitleText>
            <Card style={{ ...styles.inputContainer }}>
              <BodyText>Select a Number</BodyText>
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
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={handleResetInput}
                    color={Colors.accent}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
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
      </KeyboardAvoidingView>
    </ScrollView>
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
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  // button: {
  //   // width: "40%",
  //   width: Dimensions.get("window").width / 4,
  // },
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
