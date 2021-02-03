import React from 'react';
import { Text } from 'react-native';
import { Container, SignMessageButton, SignMessageButtonText } from './styles';
import { useNavigation } from '@react-navigation/native';

import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
    const navigation = useNavigation();

    const handleMessageButtonClick = async () => {
        let json = await Api.signOut();
        if(json.token == null){
            await AsyncStorage.setItem('token', '');
            navigation.navigate('SignIn');
        } else {
            alert('Não foi possível fazer Logout!');
        }
    }

    return (
        <Container>
            <Text>Profile</Text>
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Sair</SignMessageButtonText>
            </SignMessageButton>
        </Container>
    );
};