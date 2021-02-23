import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { Container, UserImage, InputArea, HeaderArea, EditButton, HeaderTitle, Scroller, SocialArea, SocialButton } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import SignInputProfile from '../../components/SignInputProfile';

import Api from '../../Api';


import EditIcon from '../../assets/edit.svg';
import WhatsApp from '../../assets/whatsapp.svg';
import Facebook from '../../assets/facebook.svg';
import Instagram from '../../assets/instagram.svg';


export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    this.state = {
        permission: false
    };

    const [userInfo, setUsernfo] = useState({
        USR_ID: route.params.USR_ID,
        USR_NAME: route.params.USR_NAME,
        USR_PHOTO: route.params.USR_PHOTO
    });

    const [userStatus, setUserStatus] = useState('');

    const [numberHouse, setNumberHouse] = useState('');

    const handleMessageButtonClickEdit = () => {
        navigation.navigate('EditUser', {
            USR_ID: userInfo.USR_ID,
            USR_NAME: userInfo.USR_NAME,
            USR_PHOTO: userInfo.USR_PHOTO,
            CHURCH_ID: userInfo.CHURCH_ID,
            CHURCH_DESC: userInfo.CHURCH_DESC,
            TYPEHOUSE_ID: userInfo.TYPEHOUSE_ID,
            TYPEHOUSE_DESC: userInfo.TYPEHOUSE_DESC,
            STATES_ID: userInfo.STATES_ID,
            STATES_DESC: userInfo.STATES_DESC,
            USRTYPE: userInfo.USRTYPE,
            USRTYPE_DESC: userInfo.USRTYPE_DESC
        });
    };

    const getUserProfile = async () => {
        let json = await Api.getUserProfile(userInfo.USR_ID);
        if(json.length < 1){
            alert(json.error);
        } else {
            json.data.map((item, k) => {
                setUsernfo(item);
                setNumberHouse(item.NUMBER_HOUSE.toString());
                if(item.USR_STATUS == 'A')
                    setUserStatus('Ativo');
                else 
                    setUserStatus('Inativo');
            });
        }
    };

    const ButtonWhatsApp = () => {
        var i = 0;
        var number = '';
        while(i < userInfo.USR_PHONENUMBER.length) {
            if(i >= 1 && i <= 2)
                number += userInfo.USR_PHONENUMBER[i];
            else if(i >= 5 && i <= 9)
                number += userInfo.USR_PHONENUMBER[i];
            else if(i >= 11 && i <= 14)
                number += userInfo.USR_PHONENUMBER[i];
            else if(i == 14)
                break;
            i++;
        }

        Linking.canOpenURL('whatsapp://send?text=Olá, tudo bem').then(supported => {
            if(supported) {
                return Linking.openURL('whatsapp://send?text=Olá, tudo bem?&phone=+55' + number);
            } else {
                alert('Não há WhatsApp instalado no seu celular');
            }
        })
    ;}

    const ButtonFacebook = () => {
        Linking.canOpenURL('fb://profile/VictorJhepherson').then(supported => {
            if(supported) {
                return Linking.openURL('fb://profile?profile=' + userInfo.USR_FACEBOOK)
            } else {
                alert('Não há Facebook instalado no seu celular');
            }
        })
    };    

    const ButtonInstagram = () => {
        Linking.canOpenURL('instagram://user?username=sr_tito08').then(supported => {
            if(supported) {
                return Linking.openURL('instagram://user?username=' + userInfo.USR_INSTAGRAM)
            } else {
                alert('Não há Instagram instalado no seu celular');
            }
        })
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>{userInfo.USR_NAME}</HeaderTitle>
                <EditButton onPress={handleMessageButtonClickEdit}>
                    <EditIcon width="26" height="26" fill="#FFFFFF"/>
                </EditButton>
            </HeaderArea>
            <UserImage
                source={{
                    uri: userInfo.USR_PHOTO
                        ? userInfo.USR_PHOTO
                        : 'https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121233262-stock-illustration-male-default-placeholder-avatar-profile.jpg' 
                }}
            />
            <Scroller>
                <InputArea>
                    <SocialArea>
                        <SocialButton onPress={ButtonWhatsApp}>
                            <WhatsApp width="26" height="26" fill="#FFFFFF"/>
                        </SocialButton>
                        <SocialButton onPress={ButtonFacebook}>
                            <Facebook width="26" height="26" fill="#FFFFFF"/>
                        </SocialButton>
                        <SocialButton onPress={ButtonInstagram}>
                            <Instagram width="26" height="26" fill="#FFFFFF"/>
                        </SocialButton>
                    </SocialArea>
                    <SignInputProfile
                        value={userInfo.USR_DATEBIRTHDAY}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userInfo.USR_PHONENUMBER}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userStatus}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userInfo.USRTYPE_DESC}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userInfo.CHURCH_DESC}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userInfo.USRDOC_CPFNUMBER}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userInfo.USRDOC_RGNUMBER}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userInfo.SU_LOGINNAME}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userInfo.STREET}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userInfo.NEIGHBORHOOD}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={numberHouse}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userInfo.COMPLEMENT}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userInfo.CITY}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userInfo.STATES_DESC}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={userInfo.TYPEHOUSE_DESC}
                        editable={this.state.permission}
                    />
                </InputArea>
            </Scroller>
        </Container>
    );
};