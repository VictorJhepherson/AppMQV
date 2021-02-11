import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #000000;
    align-items: center;
`;

export const SignMessageButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #FFFFFF;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;
export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #000000
`;

export const UserImage = styled.Image`
    border-radius: 150px;
    width: 50%;
    height: 25%;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    height: 60px;
`;

export const HeaderTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
`;

export const EditButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
    margin-left: 210px;
`;

export const ConfigButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
    margin-left: 15px;
`;