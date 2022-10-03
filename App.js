/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { React, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextField,
  TextInput,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, Input } from '@rneui/base';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColor = isDarkMode ? "#F9F8EB" : "#1E1E1E";
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: themeColor,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.counterText,
          {
            color: themeColor,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {

  const [randomPokemon, setRandomPokemon] = useState(0);
  const [counter, setCounter] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");
  const [pokemonNameInput, setPokemonNameInput] = useState("");

  function generateNewPokemon() {
    setRandomPokemon(Math.floor(Math.random() * 1117 + 1))
  }

  function reset() {
    setRandomPokemon(Math.floor(Math.random() * 1117 + 1))
    setCounter(0)
  }

  useEffect(() => {
    setRandomPokemon(Math.floor(Math.random() * 1117 + 1))
  }, []);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data.species.name);
        setPokemonImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomPokemon}.png`)
        setPokemonName(data.species.name)
      }).catch(err => {
        console.log(err);
        generateNewPokemon();
      })
  }, [randomPokemon])

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#1E1E1E" : "F9F8EB",
  };

  return (
    <>
      <KeyboardAwareScrollView 
      style={{
        backgroundColor: backgroundStyle,
        flex: 1
      }}>
        <View>
          <Section title="PokemonC">
            HighScore: {highScore} | Score: {counter}
          </Section>
          {
            pokemonName &&
            (
              <>
                <Image
                  style={{ width: 300, height: 300, margin: 50 }}
                  source={{
                    uri: pokemonImage,
                  }}
                />
              </>
            )}
          <Button
            title="RESET"
            buttonStyle={{
              backgroundColor: 'black',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 100
            }}
            titleStyle={{ fontWeight: 'bold' }}
            onPress={reset}
          />
          <Input
            value={pokemonNameInput}
            size={14}
            color={isDarkMode ? "#F9F8EB" : "1E1E1E"}
            style={styles.pokemonNameText}
            onChangeText={value => {
              setPokemonNameInput(value)
              if (value.toLowerCase() === pokemonName.toLowerCase()) {
                setCounter(counter + 1)
                if (counter > highScore) {
                  setHighScore(counter)
                }
                generateNewPokemon()
                setPokemonNameInput("")
              }
            }}
            placeholder="Name" />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center'
  },
  highlight: {
    fontWeight: '700',
  },
  counterText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center'
  },
  pokemonNameText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30
  }
});

export default App;
