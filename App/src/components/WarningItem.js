import React from 'react';
import styled from 'styled-components/native';

const Area = styled.TouchableOpacity`
    background-color: #000000;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 15px;
    flex-direction: row;
`;

const InfoArea = styled.View`
    margin-left: 20px;
    justify-content: space-between;
`;

const WarningTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #FFF;
`;

const WarningDate = styled.Text`
    font-size: 17px;
    font-weight: bold;
    color: #FFF;
    margin-bottom: 10px;
`;

const SeeWarningButton = styled.View`
    width: 86px;
    height: 26px;
    border: 1px solid #FFFFFF;
    border-radius: 10px;
    justify-content: center;
    align-items: center; 
`;

const SeeWarningButtonText = styled.Text`
    font-size: 13px;
    color: #FFFFFF;
`;

export default ({data}) => {
    return (
        <Area>
            <InfoArea>
                <WarningTitle>{data.WARNING_TITLE}</WarningTitle>
                <WarningDate>{data.WARNING_DATE}</WarningDate>

                <SeeWarningButton>
                    <SeeWarningButtonText>Detalhes</SeeWarningButtonText>
                </SeeWarningButton>
            </InfoArea>
        </Area>
    );
}