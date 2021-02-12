import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #000000;
    flex: 1;
    justify-content: center;
`;

export const UserImage = styled.Image`
    border-radius: 150px;
    width: 50%;
    height: 25%;
    margin-left: 100px;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    height: 60px;
`;

export const HeaderTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
    margin-right: 10px;
`;

export const EditButton = styled.TouchableOpacity`
    width: 26px;
    height: 26px;
    margin-left: 70px;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 10px;
`;