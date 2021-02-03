import React, { useContext, useEffect } from 'react';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Api from "../../Api";
import { UserContext } from '../../contexts/UserContext';

import MQVLogo from '../../assets/barber.svg';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user');
            if(token) {
                let json = await Api.checkToken(token, user);
                const data = JSON.stringify(json);
                if(json.token) {
                    await AsyncStorage.setItem('token', json.token);

                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: data.USR_PHOTO
                        }
                    });

                    navigation.navigate('MainTab');
                } else {
                    navigation.navigate('SignIn');
                }
            } else {
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    }, []);

    return (
        <Container>
            <MQVLogo width="100%" height="160"/>
            <LoadingIcon size="large" color="#FFFFFF"/>
        </Container>
    );
}