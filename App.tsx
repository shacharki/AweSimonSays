import React from 'react';
import GameScreen from './App/Screens/GameScreen';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const App: React.FC = () => {

  return (
    <>
     <GameScreen/>
    </>
  );
};


export default App;

