import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #000000;
    flex: 1;
    justify-content: center;
    align-items: center; 
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #FFFFFF;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color #FFF;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    width: 100%;
`;
export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #FFFFFF
`;
export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #FFFFFF;
    font-weight: bold;
    margin-left: 5px;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 10px;
`;

export const SingInputText = styled.Text`
    flex 1;
    font-size: 16px;
    color: #ffffff;
    margin-left: 10px;
    justify-content: center;
`;

export const ButtonImage = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    background-color: #FFFFFF;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;
export const ButtonImageText = styled.Text`
    flex: 1;
    font-size: 16px;
    color: #000000;
    margin-left: 10px;
    justify-content: center;
`;