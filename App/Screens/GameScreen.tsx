import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { 
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Pressable
 } from 'react-native';
import { observer } from 'mobx-react';
import {RootStackParamList, RESULTS,GAME } from '../type';

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

const GameScreen: React.FC<Props> = observer(({navigation}) =>  {
    const { navigate } = navigation;

  
    return (
    <View style={styles.container}>
        <Pressable style={styles.startbtn}>
        <Text style={styles.btntext}>start</Text>
      </Pressable>
      <Text style={styles.title}>{'Current score: '}</Text>
    </View>
  );

  });
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

