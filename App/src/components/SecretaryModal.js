import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import ExpandIcon from '../assets/expand.svg';
import MQVLogo from '../assets/barber.svg';

const Modal = styled.Modal`
    
`;

const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-start;
`;

const ModalBody = styled.View`
    background-color: #000000;
    min-height: 1000px;
    max-height: 1000px;
    min-width: 300px;
    max-width: 300px;
    padding: 10px 20px 40px 20px;
    position: absolute;
    right: 0;
`;

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

const SignMessageButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #FFFFFF;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #000000
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export default ({show, setShow}) => {
    const navigation = useNavigation();

    const handleCloseButton = () => {
        setShow(false);
    };

    const handleMessageButtonClickYoung = () => {
        setShow(false);
        navigation.navigate('Youngs');
    };

    const handleMessageButtonClickNews = () => {

    };

    const handleMessageButtonClickSchedule = () => {

    };

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <ModalArea>
                <ModalBody>
                    <CloseButton onPress={handleCloseButton}>
                        <ExpandIcon width="40" height="40" fill="#FFFFFF"/>
                    </CloseButton>
                    <InputArea>
                        <SignMessageButton onPress={handleMessageButtonClickYoung}>
                            <SignMessageButtonText>Jovens</SignMessageButtonText>
                        </SignMessageButton>
                        <SignMessageButton onPress={handleMessageButtonClickNews}>
                            <SignMessageButtonText>Notícias</SignMessageButtonText>
                        </SignMessageButton>
                        <SignMessageButton onPress={handleMessageButtonClickSchedule}>
                            <SignMessageButtonText>Agenda</SignMessageButtonText>
                        </SignMessageButton>

                        <MQVLogo width="100%" height="330"/>
                    </InputArea>
                </ModalBody>
            </ModalArea>
        </Modal>
    );
}