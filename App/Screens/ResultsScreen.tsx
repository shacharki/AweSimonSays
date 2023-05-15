
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, GAME } from '../type';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

const Button = styled(TouchableOpacity)`
   background-color: 'orange',
    width: 200;
    height: 60;
    border-radius: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20%;
    background-color: #bbb3b3;
`;
const ButtonText = styled(Text)`
  font-size: 16px;
  color: black;
`;
const Title = styled(Text)`
  font-size: 35px;
  color: black;
  margin: 10%;
`;
const Container = styled(View)`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: white;
`;

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

const GameScreen = ({ route, navigation }: Props) => {

    return (
        <Container>
            <Title >Best results:</Title>
            <Button onPress={() => navigation.navigate(GAME)}>
                <ButtonText >New Game</ButtonText>
            </Button>
        </Container>
    );
};


export default GameScreen;

