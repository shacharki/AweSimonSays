import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store/UseStore';
import { modalOff } from '../Slices/SliceModal';
import { Text, View, Modal, TextInput, TouchableOpacity, Platform } from 'react-native';
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
    background-color: #1b76de;
    margin-top: 20px;
    border-width: 1px;
    width: 200px;
`;
const ButtonText = styled(Text)`
    color: #000000;
    text-align: center;
    font-size: ${Platform.OS === 'ios' ? '18px' : '15px'};
`;
const InputText = styled(TextInput)`
    /* color: #000000; */
    text-align: center;
    font-size: ${Platform.OS === 'ios' ? '18px' : '15px'};
`;
const ModalText = styled(Text)`
    margin-bottom: 15px;
    text-align: center;
    color: black;
    font-size: ${Platform.OS === 'ios' ? '20px' : '18px'};

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
    shadow-opacity: 0.5px;
    shadow-radius: 4px;
    elevation: 5px;
`;
const ErrorText = styled(Text)`
  font-size: ${Platform.OS === 'ios' ? '18px' : '12px'};
  color: red;
  margin-top: 16px;
`;


type Props = {
    saveScore: (name: string, score: number) => Promise<void>;
    score: number
}

const ModalGame = ({ saveScore, score }: Props) => {
    const dispatch = useDispatch();
    const [playerName, setPlayerName] = useState('')
    const [error, setError] = useState(false)

    const showResults = () => {
        if (!playerName) {
            setError(true)
            return
        } if (!error) {
            saveScore(playerName, score)
            dispatch(modalOff());
        }
    };

    const resultsModalVisible = useSelector(
        (state: RootState) => state.modalName.modalOn,
    );

    const handleNamePlayer = (event: string) => {
        if (!event) {
            setError(true)
        } else {
            setError(false)
            setPlayerName(event)
        }

    };

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
                    <InputText
                        placeholder="Add Your Name"
                        onChangeText={e => handleNamePlayer(e)}
                        defaultValue={playerName}
                    />
                    <ErrorText>{error && "Please enter your name"}</ErrorText>
                    <ButtonShow
                        onPress={showResults}>
                        <ButtonText>Show Results</ButtonText>
                    </ButtonShow>
                </ModalView>
            </CenterView>
        </Modal>
    );
};

export default ModalGame;
