import React from 'react';
import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #FFFFFF;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

export default ({IconSvg, type, options, placeholder, style, value, maxLength, onChangeText}) => {
    return (
        <InputArea>
            <IconSvg width="24" height="24" fill="#000000" />
            <TextInputMask 
                type={type}
                options={{options}}
                placeholder={placeholder}
                placeholderTextColor="#000000"
                style={style}
                value={value}
                maxLength={maxLength}
                onChangeText={onChangeText}
            />
        </InputArea>
    );
}