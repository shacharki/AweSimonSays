import React from 'react';
import  GameScreen  from './App/Screens/GameScreen';
import  ResultsScreen  from './App/Screens/ResultsScreen';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Provider } from 'mobx-react';

const App: React.FC = () => {

  const Navigate = createNativeStackNavigator();

  return (
    <Provider>
      <NavigationContainer>
        <Navigate.Navigator>
          <Navigate.Screen name="Game" component={GameScreen} />
          {/* <Navigate.Screen name="Results" component={ResultsScreen} /> */}
        </Navigate.Navigator>
      </NavigationContainer>
    </Provider>
  );
};


export default App;

