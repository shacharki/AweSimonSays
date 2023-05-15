import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { observer } from 'mobx-react';
import { RootStackParamList, RESULTS, GAME } from '../type';
import styled from 'styled-components';


const Button = styled(TouchableOpacity)`
   background-color: 'orange',
    width: 140;
    height: 70;
    border-radius: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30%;
    background-color: #000000;
`;
const ButtonText = styled(Text)`
  font-size: 25px;
  color: #ffffff;
`;
const Title = styled(Text)`
  font-size: 20px;
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

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

const GameScreen: React.FC<Props> = observer(({ navigation }) => {
  const { navigate } = navigation;


  return (
    <Container>
      <Title>{'Current score: '}</Title>
      <Button>
        <ButtonText>start</ButtonText>
      </Button>
    </Container>
  );

});

export default GameScreen;

