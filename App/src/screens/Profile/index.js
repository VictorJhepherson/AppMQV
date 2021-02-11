import React, { useEffect, useState, setState } from 'react';
import { Container, SignMessageButton, SignMessageButtonText, UserImage, InputArea, HeaderArea, EditButton, HeaderTitle, ConfigButton } from './styles';
import { useNavigation } from '@react-navigation/native';
import SignInputProfile from '../../components/SignInputProfile';

import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';

import EditIcon from '../../assets/edit.svg';
import ConfigIcon from '../../assets/config.svg';

export default () => {
    const navigation = useNavigation();

    this.state = {
        permission: false
    };

    const [nomeField, setNomeField] = useState('');
    const [photoField, setPhotoField] = useState('');
    const [telField, setTelField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [firstName, setFirstName] = useState('');
    const [userType, setUserType] = useState(0);

    const handleMessageButtonClick = async () => {
        let json = await Api.signOut();
        if(json.token == null){
            await AsyncStorage.setItem('token', '');
            navigation.navigate('SignIn');
        } else {
            alert('Não foi possível fazer Logout!');
        }
    };

    const handleMessageButtonClickEdit = () => {

    };

    const handleMessageButtonClickConfig = () => {

    };

    const getUserProfile = async () => {
        const user = await AsyncStorage.getItem('user');
        let json = await Api.getUserProfile(user);
        if(json.length < 1){
            alert(json.error);
        } else {
            json.data.map((item, k) => {
                setNomeField(item.USR_NAME);
                var i = 0;
                var firstName = '';
                var OlaByName = '';
                while(item.USR_NAME[i] != ' ')
                {
                    firstName += item.USR_NAME[i];
                    i++;
                }
                OlaByName += 'Olá, ' + firstName;
                setFirstName(OlaByName);
                if(item.USR_PHOTO != '' || item.USR_PHOTO != null)
                    setPhotoField(item.USR_PHOTO);
                setEmailField(item.SU_LOGINNAME);
                setUserType(item.USRTYPE);
                var ddd = '';
                var dv = '';
                var telNumber1 = '';
                var telNumber2 = '';
                var PHONENUMBER = '';
                for(var i = 0; i < item.USR_PHONENUMBER.length; i++)
                {
                    if(i <= 1)
                        ddd += item.USR_PHONENUMBER[i];
                    else if(i == 2)
                        dv += item.USR_PHONENUMBER[i];
                    else if(i >= 3 && i <= 6)
                        telNumber1 += item.USR_PHONENUMBER[i];
                    else 
                        telNumber2 += item.USR_PHONENUMBER[i];

                }
                PHONENUMBER += '(' + ddd + ')' + ' ' + dv + telNumber1 + '-' + telNumber2;
                setTelField(PHONENUMBER);
            });
        }
    };

    useEffect(() => {
        getUserProfile();
    });

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>{firstName}</HeaderTitle>
                <EditButton onPress={handleMessageButtonClickEdit}>
                    <EditIcon width="26" height="26" fill="#FFFFFF"/>
                </EditButton>
                {userType == 1 && 
                    <ConfigButton onPress={handleMessageButtonClickConfig}>
                        <ConfigIcon width="26" height="26" fill="#FFFFFF"/>
                    </ConfigButton>
                }
            </HeaderArea>
            <UserImage
                source={{
                    uri: photoField
                        ? photoField
                        : 'https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121233262-stock-illustration-male-default-placeholder-avatar-profile.jpg' 
                }}
            />
            <InputArea>
                <SignInputProfile
                    value={nomeField}
                    editable={this.state.permission}
                />
                <SignInputProfile
                    value={telField}
                    editable={this.state.permission}
                />
                <SignInputProfile
                    value={emailField}
                    editable={this.state.permission}
                />
                <SignMessageButton onPress={handleMessageButtonClick}>
                    <SignMessageButtonText>Sair</SignMessageButtonText>
                </SignMessageButton>
            </InputArea>
        </Container>
    );
};