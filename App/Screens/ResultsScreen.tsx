
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
 import {NavigationList } from '../type';
import {Text, View, StyleSheet, Pressable} from 'react-native';

type Props = NativeStackScreenProps<NavigationList, 'Results'>;

const GameScreen = ({route, navigation}: Props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Highscores</Text>
      <Pressable style={styles.startbtn} onPress={() => navigation.goBack()}>
        <Text style={styles.btntext}>New Game</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 48,
    margin: '10%',
    color: 'black',
  },
  startbtn: {
    backgroundColor: 'orange',
    width: 200,
    height: 60,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20%',
  },
  btntext: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
  },

});
export default GameScreen;

