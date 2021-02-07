import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #FFFFFF;
`;

export const SignMessageButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #000000;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px
`;
export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #FFFFFF
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 10px;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const HeaderArea = styled.View`
    height: 60px;
    flex-direction: row-reverse;
    background-color: #000000;
    justify-content: center;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #FFF;
`;
