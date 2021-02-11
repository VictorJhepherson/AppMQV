import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #000000;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
`;

export const HeaderTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
    margin-left: 10px;
`;

export const ListArea = styled.View`
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px
`;
