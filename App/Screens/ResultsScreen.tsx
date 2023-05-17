
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, GAME } from '../type';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components';
import ModalGame from './ModalGame'
import useBestsscores from '../Hook/UseBestsScores'

const Button = styled(TouchableOpacity)`
    width: ${Platform.OS === 'ios' ? '250' : '200'};
    height: ${Platform.OS === 'ios' ? '80' : '60'};
    border-radius: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30%;
    background-color: #1b76de;
    border-width: 2px;
`;
const ButtonText = styled(Text)`
  font-size: ${Platform.OS === 'ios' ? '20px' : '16px'};
  color: black;
`;
const Title = styled(Text)`
  font-size: ${Platform.OS === 'ios' ? '40px' : '30px'};
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
const ViewList = styled(View)`
    flex: 1;
`;
const TextPlayers = styled(Text)`
    ${Platform.OS === 'ios' &&  'margin: 7px'};
    ${Platform.OS === 'ios' &&  'font-size: 17px'};
`;



type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

const ResultsScreen = ({ route, navigation }: Props) => {
    const {score} = route.params;
    const {saveScore, scoreList} = useBestsscores();

    const NamesScore = scoreList.map((score, idx) => {
        return (
          <TextPlayers key={idx}>
            {score.name || 'Anonymous'} - {score.score}
          </TextPlayers>
        );
      });
    return (
        <Container>
            <ModalGame saveScore={saveScore} score={score} />
            <Title >Best results:</Title>
            <ViewList>{NamesScore}</ViewList>
            <Button onPress={() => navigation.navigate(GAME)}>
                <ButtonText >New Game</ButtonText>
            </Button>
        </Container>
    );
};


export default ResultsScreen;

