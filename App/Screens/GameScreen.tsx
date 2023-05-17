import { 
  createNativeStackNavigator, 
  NativeStackScreenProps
 } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { observer } from 'mobx-react';
import { RootStackParamList } from '../type';
import styled from 'styled-components';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '../Store/UseStore';
import useRandomSequence from '../Hook/UseRandomHook';
import { addItem } from '../Slices/SliceSequence';
import { NavigationContainer } from '@react-navigation/native';
import ResultsScreen from './ResultsScreen';
 import useSoundsHook from '../Hook/UseSoundsHook';
 import { Platform } from 'react-native';


const Button = styled(TouchableOpacity)`
    width: 90%;
    height: ${Platform.OS === 'ios' ?  '50%' : '40%'};
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 70%;
    ${Platform.OS !== 'ios' &&  'margin-right: 20%'};
    background-color: #8c8080;
`;
const ButtonColor = styled(TouchableOpacity) <{ $color?: string }>`
  flex:1;
  background-color: ${p => (p?.$color ? p?.$color : 'white')};
  margin: 5px;
  border-radius: 50px;
  border-width: 3px;

`;
const ButtonText = styled(Text)`
  font-size: 30px;
  color: #000000;
  font-style: normal;
  font-weight: 600;
  text-align: center;
`;
const ScoreText = styled(Text)`
  font-size: 24px;
  color: #000000;
  font-style: normal;
  font-weight: 600;
  text-align: center;
`;
const ScoreContainer = styled(View)`
  height: 70%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #978484;
  border-radius: 50px;
  justify-content: center;
  display: flex;
  margin-top: 110%;
`;
const Container = styled(View)`
  display: flex;
  height: 75%;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 50px;

`;
const PartColor = styled(View)`
  display: flex;
  flex-direction: column;
`;
const SubPartColor = styled(View)`
  height: 200px;
  border-radius: 100px;
  width: 200px;
  position: absolute;
  top: 50%;
  z-index: 1;
  left: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Color = styled(View)`
  height: 50%;
  flex-direction: row;
  display: flex;

`;
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigate.Navigator>
          <Navigate.Screen name="Game" component={GameScreen} />
          <Navigate.Screen name="Results" component={ResultsScreen} />
        </Navigate.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
const Navigate = createNativeStackNavigator<RootStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'Game'>;

const GameScreen: React.FC<Props> = observer(({ navigation }) => {

  const { navigate } = navigation;
  const [clicked, setClicked] = useState<number>();
  const dispatch = useDispatch();
   const sound = useSoundsHook();
  const modalVisible = useSelector(
    (state: RootState) => state.modalName.modalOn,
  );

  const currentColor = useSelector(
    (state: RootState) => state.simon.currentColor,
  );
  const { isStart, score, restart, tempSimon } = useRandomSequence();

  useEffect(() => {
    modalVisible &&
      navigate(
        'Results' as never,
        {
          score: score,
          restart: restart,
        } as never,
      );
  }, [modalVisible]);

  const clickColor = (index: number) => {
    !tempSimon && isStart && dispatch(addItem(index));
  };

  const pressIn = (index: number) => {
    if (!tempSimon && isStart) {
      sound[index-1]?.play()
      setClicked(index);
    }
  };

  const RowColor = (
    colorIndex: number,
    ColorIn: string,
    ColorOut: string,
  ) => {
    return (
      <ButtonColor 
      disabled={!isStart}
      $color={
        currentColor === colorIndex ||
          clicked === colorIndex
          ? ColorIn : ColorOut}
        onPress={() => clickColor(colorIndex)}
        onPressIn={() => pressIn(colorIndex)}
        onPressOut={() => setClicked(-1)}
      ></ButtonColor>
    );
  };

  return (

    <SafeAreaView>
      <StatusBar />
      <SubPartColor>
        {!isStart ? (
          <Button onPress={restart}>
            <ButtonText>START</ButtonText>
          </Button>
        ) : (
          <ScoreContainer>
          <ScoreText>numberPress: {score}</ScoreText>
          </ScoreContainer>
        )}
      </SubPartColor>
      <Container>
        <PartColor>
          <Color>
            {RowColor(1, '#05de05', '#046104')}
            {RowColor(2, '#da0202', '#5f0101')}
          </Color>
          <Color>
            {RowColor(3, '#dddd02', '#727203')}
            {RowColor(4, '#0505e2', '#03035f')}
          </Color>
        </PartColor>
      </Container>
    </SafeAreaView>
  );

});

export default AppWrapper;

