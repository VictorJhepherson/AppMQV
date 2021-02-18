import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import ExpandIcon from '../assets/expand.svg';
import LockIcon from '../assets/lock.svg';

import Api from '../Api';

const Modal = styled.Modal`
    
`;

const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-end;
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

const InputAreaPass = styled.View`
    width: 100%;
    height: 60px;
    background-color: #FFFFFF;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #000000;
    margin-left: 10px;
`;

export default ({show, setShow, value}) => {
    const navigation = useNavigation();

    const [passwordField, setpasswordField] = useState('');
    const [passwordNewField, setpasswordNewField] = useState('');

    const handleCloseButton = () => {
        setShow(false);
    };

    const handleMessageButtonClick = async () => {
        if(passwordField != passwordNewField)
            alert('Senhas diferentes, digite novamente');
        else {
            let res = await Api.updatePass(passwordField, value);
            if(res.error != null){
                alert('Não foi possível efetuar a alteração da senha, tente novamente ou contate o administrador');
            } else {
                setShow(false);
                navigation.reset({
                    routes: [{name: 'Youngs'}]
                });
            }
        }
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
                        <InputAreaPass>
                            <LockIcon width="24" height="24" fill="#000000" />
                            <Input 
                                placeholder='Digite a nova senha'
                                placeholderTextColor="#000000"
                                value={passwordField}
                                onChangeText={setpasswordField}
                                secureTextEntry={true}
                                maxLength={15}
                            />
                        </InputAreaPass>
                        <InputAreaPass>
                            <LockIcon width="24" height="24" fill="#000000" />
                            <Input 
                                placeholder='Digite a senha novamente'
                                placeholderTextColor="#000000"
                                value={passwordNewField}
                                onChangeText={setpasswordNewField}
                                secureTextEntry={true}
                                maxLength={15}
                            />
                        </InputAreaPass>
                        <SignMessageButton onPress={handleMessageButtonClick}>
                            <SignMessageButtonText>Alterar senha</SignMessageButtonText>
                        </SignMessageButton>
                    </InputArea>
                </ModalBody>
            </ModalArea>
        </Modal>
    );
}