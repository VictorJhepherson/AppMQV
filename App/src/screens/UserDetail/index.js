import React, { useEffect, useState, setState } from 'react';
import { Container, UserImage, InputArea, HeaderArea, EditButton, HeaderTitle, Scroller } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import SignInputProfile from '../../components/SignInputProfile';

import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';

import EditIcon from '../../assets/edit.svg';

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