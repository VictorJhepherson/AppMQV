import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, InputArea, CustomButton, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold } from './styles';
import AsyncStorage from "@react-native-community/async-storage";
import { UserContext } from '../../contexts/UserContext';

import Api from '../../Api';

import SignInput from '../../components/SignInput'

import MQVLogo from '../../assets/MQVLogo.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setpasswordField] = useState('');

    const handleSignClick = async () => {
        if(emailField != '' && passwordField != '') {
            let json = await Api.signIn(emailField, passwordField); 
            if(json.token)  {
                await AsyncStorage.setItem('token', json.token);
                await AsyncStorage.setItem('user', json.data.USR_ID.toString());
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: json.data.USR_PHOTO
                    }
                });
                navigation.reset({
                    routes: [{name: 'MainTab'}]
                });

            } else {
                alert('E-mail e/ou senha incorretos!');
            }

        } else {
            alert("Preencha os campos!");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.navigate('SignUp');
    }

    return (
        <Container>
            <MQVLogo width="100%" height="160"/>

            <InputArea>
                <SignInput 
                    IconSvg={EmailIcon} 
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />
                <SignInput 
                    IconSvg={LockIcon} 
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t=>setpasswordField(t)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}