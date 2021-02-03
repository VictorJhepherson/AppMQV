import React, { useContext } from 'react';
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import ScheduleIcon from '../assets/today.svg';
import ProfileIcon from '../assets/account.svg';

const TabArea = styled.View`
    height: 60px;
    background-color: #000000;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #000000;
    margin-top: -20px;
`;

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({ state, navigation }) => {
    const { state: user } = useContext(UserContext);

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
                <HomeIcon style={{opacity: state.index===0 ? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
            </TabItem>
            <TabItemCenter onPress={()=>goTo('ScheduleMQV')}>
                <ScheduleIcon style={{opacity: state.index===1 ? 1 : 0.5}} width="32" height="32" fill="#000000"/>
            </TabItemCenter>
            <TabItem onPress={()=>goTo('Profile')}>
                {user.avatar != '' && user.avatar != undefined ?
                    <AvatarIcon source={{uri: user.avatar}} />
                    :
                    <ProfileIcon style={{opacity: state.index===2 ? 1 : 0.5}} width="24" height="24" fill="#FFFFFF"/>
                }
            </TabItem>
        </TabArea>
    );
};