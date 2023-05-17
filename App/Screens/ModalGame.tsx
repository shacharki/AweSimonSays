import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../Store/UseStore';
import {modalOff} from '../Slices/SliceModal';
import {Text, View, Modal, TextInput, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

const CenterView = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 22;
`;
const ButtonShow = styled(TouchableOpacity)`
    border-radius: 20px;
    padding: 10px;
    background-color: #403ae3;
    margin-top: 20px;
`;
const ButtonText = styled(Text)`
    color: #ffffff;
    font-weight: bold;
    text-align: center;
`;
const ModalText = styled(Text)`
    margin-bottom: 15px;
    text-align: center;
    color: black;
`;
const ModalView = styled(View)`
    margin: 20px;
    background-color: white;
    border-radius: 20px;
    padding: 35px;
    align-items: center;
    shadow-color: #000000;
    shadow-offset: {
      width: 0px;
      height: 2px;
    };
    shadow-opacity: 0.25px;
    shadow-radius: 4px;
    elevation: 5px;
`;

type Props = {
  saveScore: (name: string, score: number) => Promise<void>;
  score: number
}

const ModalGame = ({saveScore, score} : Props) => {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('')
  
  const handleHideModal = () => {
    saveScore(playerName, score)
    dispatch(modalOff());
  };

  const resultsModalVisible = useSelector(
    (state: RootState) => state.modalName.modalOn,
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={resultsModalVisible}
      onRequestClose={() => {
        dispatch(modalOff());
      }}>
      <CenterView>
        <ModalView>
          <ModalText>Game Over!!!</ModalText>
          <TextInput
            placeholder="Add Your Name"
            onChangeText={e => setPlayerName(e)}
            defaultValue={playerName}
          />
          <ButtonShow
            onPress={handleHideModal}>
            <ButtonText>Show Best Results</ButtonText>
          </ButtonShow>
        </ModalView>
      </CenterView>
    </Modal>
  );
};

export default ModalGame;
