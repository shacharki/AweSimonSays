
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, GAME } from '../type';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import ModalGame from './ModalGame'
import useBestsscores from '../Hook/UseBestsScores'

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

const ResultsScreen = ({ route, navigation }: Props) => {
    const {score} = route.params;
    const {saveScore, scoreList} = useBestsscores();

    const NamesScore = scoreList.map((score, idx) => {
        return (
          <Text key={idx}>
            {score.name || 'Anonymous'} - {score.score}
          </Text>
        );
      });
    return (
        <Container>
            <ModalGame saveScore={saveScore} score={score} />
            <Title >Best results:</Title>
            <View style={{flex: 1}}>{NamesScore}</View>
            <Button onPress={() => navigation.navigate(GAME)}>
                <ButtonText >New Game</ButtonText>
            </Button>
        </Container>
    );
};


export default ResultsScreen;

