import React, { useState } from 'react';
import styled from 'styled-components/native';

import ExpandIcon from '../assets/expand.svg';

import Api from '../Api';

import * as ImagePicker from 'react-native-image-picker';

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

const InputArea = styled.View`
    width: 100%;
    padding: 40px;
    justify-content: center;
`;

const CustomButtonImage = styled.TouchableOpacity`
    height: 60px;
    background-color: #FFFFFF;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const CustomButtonImageText = styled.Text`
    font-size: 16px;
    color: #000000
`;

export const UserImage = styled.Image`
    width: 60%;
    height: 45%;
    margin-left: 60px;
    margin-bottom: 15px;
    border-radius: 30px;
`;

export default ({show, setShow, value}) => {
    const handleCloseButton = () => {
        setShow(false);
    };

    const [avatar, setAvatar] = useState();
    const imagePickerCallBack = (data) => {
        if(data.didCancel) {
            return;
        }

        if(data.error) {
            return;
        }

        if(!data.uri) {
            return;
        }

        console.log(data);
        setAvatar(data);
    };

    const handleMessageButtonClick = async () => {
        const max = 1024 * 1024 * 5;
        if(avatar.type != "image/jpeg" && avatar.type != "image/jpg" && avatar.type != "image/png")
            alert('Formato da imagem incorreto, seleciona uma foto com o formato: PNG, JPEG ou JPG');
        else if(avatar.fileSize > max)
            alert('Seleciona uma foto com tamanho máximo de 5MB');
        else {
            const data = new FormData();
            data.append('USR_PHOTO', { 
                name: avatar.fileName,
                type: avatar.type,
                fileSize: avatar.fileSize,
                uri: Platform.OS === "android" ? avatar.uri : avatar.uri.replace("file://", "")
             });
            data.append('USR_ID', value);
    
            let res = await Api.updatePhoto(data);
    
            if(res.error != null)
                alert('Erro: '+ res.error);
            else
                setShow(false);
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
                        <UserImage
                            source={{
                                uri: avatar 
                                  ? avatar.uri 
                                  : 'https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121233262-stock-illustration-male-default-placeholder-avatar-profile.jpg' 
                            }}
                        />
                        <CustomButtonImage onPress={() => ImagePicker.launchImageLibrary({}, imagePickerCallBack)}>
                            <CustomButtonImageText>Escolher foto</CustomButtonImageText>
                        </CustomButtonImage>
                        <SignMessageButton onPress={handleMessageButtonClick}>
                            <SignMessageButtonText>Salvar</SignMessageButtonText>
                        </SignMessageButton>
                    </InputArea>
                </ModalBody>
            </ModalArea>
        </Modal>
    );
}