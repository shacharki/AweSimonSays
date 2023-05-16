import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { observer } from 'mobx-react';
import { RootStackParamList, RESULTS, GAME } from '../type';
import styled from 'styled-components';
import {Provider, useDispatch, useSelector} from 'react-redux';
import  {RootState, store} from '../Store/UseStore';
import useRandomSequence from '../Hook/UseRandomHook';
import { addItem } from '../Slices/SliceSequence';
import { NavigationContainer } from '@react-navigation/native';
import ResultsScreen from './ResultsScreen';


const Button = styled(TouchableOpacity)`
    width: 90%;
    height: 60%;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60%;
    background-color: #000000;
`;
const ButtonColor = styled(TouchableOpacity) <{ $color?: string }>`
  flex:1;
  background-color: ${p => (p?.$color ? p?.$color : 'white')};
`;
const ButtonText = styled(Text)`
  font-size: 30px;
  color: white;
  font-style: normal;
  font-weight: 600;
  text-align: center;
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
  const [start, setStart] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {isStart, score, restart, simonSpeaks} = useRandomSequence();
  
  useEffect(() => {
      navigation.navigate(
        'Results' as never,
        {
          score: score,
          restart: restart,
        } as never,
      );
  }, []);
  
  const currentColor = useSelector(
    (state: RootState) => state.simon.currentColor,
  ); 

  const clickColor = (index: number) => {
    !simonSpeaks && isStart && dispatch(addItem(index));
  };

  const pressIn = (index: number) => {
    if(!simonSpeaks && isStart){
      setClicked(index);
    }
  };

  const RowColor = (
    colorIndex: number,
    colorPress: string,
  ) => {
    return (
      <ButtonColor $color={colorPress}
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
          {!start ? (
            <Button onPress={() => setStart(!!start)}>
              <ButtonText>Start</ButtonText>
            </Button>
          ) : (
            <ButtonText>numberPress</ButtonText>
          )}
        </SubPartColor>
      <Container>
        
        <PartColor>
          <Color>
            {RowColor(1, '#05de05')}
            {RowColor(2, '#da0202')}
          </Color>
          <Color>
            {RowColor(3, '#dddd02')}
            {RowColor(4, '#0505e2')}
          </Color>
        </PartColor>
      </Container>
    </SafeAreaView>
  );

});

export default AppWrapper;

