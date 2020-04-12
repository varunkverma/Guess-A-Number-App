import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { ScreenOrientation } from "expo";
import { Ionicons } from "@expo/vector-icons";
import DefaultStyles from "../constants/default-styles";
import NumberContainer from "../components/number-container.component";
import Card from "../components/card.component";
import MainButton from "../components/main-button.component";
import BodyText from "../components/body-text.component";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const renderItemList = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => Dimensions.addEventListener("change", updateLayout);
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
      setPastGuesses([]);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const handleNextGuess = (direction) => {
    console.log(direction);
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "higher" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't Lie!", "You know you lied!...", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextGuess = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextGuess);
    setPastGuesses((pastGuesses) => [nextGuess.toString(), ...pastGuesses]);
  };

  let listContainerStyle = styles.listContainer;
  if (availableDeviceWidth < 350) listContainerStyle = styles.listContainerBig;

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>

        <View style={styles.controls}>
          <View style={styles.button}>
            <MainButton onPress={handleNextGuess.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </MainButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>

          <View style={styles.button}>
            <MainButton onPress={handleNextGuess.bind(this, "higher")}>
              <Ionicons name="md-add" size={24} color="white" />
            </MainButton>
          </View>
        </View>

        <View style={listContainerStyle}>
          {/*<ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index, guesses) =>
            renderItemList(guess, guesses.length - index)
          )}
          </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderItemList.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View style={styles.button}>
          <MainButton onPress={handleNextGuess.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.button}>
          <MainButton onPress={handleNextGuess.bind(this, "higher")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
      </Card>
      <View style={listContainerStyle}>
        {/*<ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index, guesses) =>
            renderItemList(guess, guesses.length - index)
          )}
          </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderItemList.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 400,
    maxWidth: "90%",
  },
  button: {
    width: "48%",
    borderRadius: 10,
    alignItems: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
  listContainer: {
    width: "60%",
    flex: 1,
  },
  listContainerBig: {
    width: "80%",
    flex: 1,
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    width: "100%",
  },
});

export default GameScreen;
