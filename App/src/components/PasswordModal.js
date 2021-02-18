import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import ExpandIcon from '../assets/expand.svg';
//import SignInput from 'SignInput';
//import LockIcon from '../../assets/lock.svg';

const Modal = styled.Modal`
    
`;

const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-start;
`;

const ModalBody = styled.View`
    background-color: #000000;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    min-height: 300px;
    padding: 10px 20px 40px 20px;
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

    const [passwordField, setpasswordField] = useState('');
    const [passwordNewField, setpasswordNewField] = useState('');

    const handleCloseButton = () => {
        setShow(false);
    };

    const handleMessageButtonClick = async () => {

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

                        <SignMessageButton onPress={handleMessageButtonClick}>
                            <SignMessageButtonText>Alterar senha</SignMessageButtonText>
                        </SignMessageButton>
                    </InputArea>
                </ModalBody>
            </ModalArea>
        </Modal>
    );
}