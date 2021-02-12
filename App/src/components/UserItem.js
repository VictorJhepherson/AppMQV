import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const Area = styled.TouchableOpacity`
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

const UserName = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #000000;
`;

const UserTel = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #000000;
`;

const SeeUserButton = styled.View`
    width: 86px;
    height: 26px;
    border: 1px solid #000000;
    border-radius: 10px;
    justify-content: center;
    align-items: center; 
`;

const SeeUserButtonText = styled.Text`
    font-size: 13px;
    color: #000000;
`;

const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
`;

export default ({data}) => {
    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('UserDetail', {
            USR_ID: data.USR_ID,
            USR_NAME: data.USR_NAME,
            USR_PHOTO: data.USR_PHOTO
        });
    };

    return (
        <Area onPress={handleClick}>
            <Avatar source={{
                    uri: data.USR_PHOTO
                    ? data.USR_PHOTO
                    : 'https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121233262-stock-illustration-male-default-placeholder-avatar-profile.jpg'
                }} />
            <InfoArea>
                <UserName>{data.USR_NAME}</UserName>
                <UserTel>{data.USR_PHONENUMBER}</UserTel>

                <SeeUserButton>
                    <SeeUserButtonText>Ver Perfil</SeeUserButtonText>
                </SeeUserButton>
            </InfoArea>
        </Area>
    );
}