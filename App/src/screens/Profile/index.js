import React, { useEffect, useState, setState } from 'react';
import { Container, SignMessageButton, SignMessageButtonText, Scroller, InputArea, HeaderArea, HeaderTitle } from './styles';
import { useNavigation } from '@react-navigation/native';
import SignInputProfile from '../../components/SignInputProfile';

import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
    const navigation = useNavigation();

    this.state = {
        permission: false
    };

    let visibleComplement = true;
    const [nomeField, setNomeField] = useState('');
    const [dateNascField, setDateNascField] = useState('');
    const [telField, setTelField] = useState('');
    const [churchField, setChurchField] = useState('');
    const [cpfField, setCPFField] = useState('');
    const [rgField, setRGField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [streetField, setStreetField] = useState('');
    const [neighborhoodField, setNeighborhoodField] = useState('');
    const [numberHouseField, setNumberHouseField] = useState('');
    const [typeHouseField, setTypeHouseField] = useState('');
    const [complementField, setComplementField] = useState('');
    const [cityField, setCityField] = useState('');
    const [stateField, setStateField] = useState('');

    const handleMessageButtonClick = async () => {
        let json = await Api.signOut();
        if(json.token == null){
            await AsyncStorage.setItem('token', '');
            navigation.navigate('SignIn');
        } else {
            alert('Não foi possível fazer Logout!');
        }
    };

    const getUserProfile = async () => {
        const user = await AsyncStorage.getItem('user');
        let json = await Api.getUserProfile(user);
        const key = 0;
        if(json.length < 1){
            alert(json.error);
        } else {
            json.data.map((item, k) => {
                setNomeField(item.USR_NAME);
                setDateNascField(item.USR_DATEBIRTHDAY);
                setTelField(item.USR_PHONENUMBER);
                setChurchField(item.CHURCH_DESC);
                setCPFField(item.USRDOC_CPFNUMBER);
                setRGField(item.USRDOC_RGNUMBER);
                setEmailField(item.SU_LOGINNAME);
                setStreetField(item.STREET);
                setNeighborhoodField(item.NEIGHBORHOOD);
                setNumberHouseField(item.NUMBER_HOUSE.toString());
                setTypeHouseField(item.TYPEHOUSE_DESC);
                if(item.COMPLEMENT == null){
                    visibleComplement = false;
                } else {
                    setComplementField(item.COMPLEMENT);
                }
                setCityField(item.CITY);
                setStateField(item.STATE);
            });
        }
    };
    
    let Complement = [];
    if(visibleComplement){
        Complement.push(
            <SignInputProfile
                value={complementField}
                onChangeText={t=>setComplementField(t)}
                editable={this.state.permission}
                key={0}
            />
        );
    }

    useEffect(() => {
        getUserProfile();
    });

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>PERFIL</HeaderTitle>
            </HeaderArea>
            <Scroller>
                <InputArea>
                    <SignInputProfile
                        value={nomeField}
                        onChangeText={t=>setNomeField(t)}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={dateNascField}
                        onChangeText={t=>setDateNascField(t)}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={telField}
                        onChangeText={t=>setTelField(t)}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={churchField}
                        onChangeText={t=>setChurchField(t)}
                        editable={this.state.permission}
                    />
                    <SignInputProfile 
                        value={cpfField}
                        onChangeText={t=>setCPFField(t)}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={rgField}
                        onChangeText={t=>setRGField(t)}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={emailField}
                        onChangeText={t=>setEmailField(t)}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={streetField}
                        onChangeText={t=>setStreetField(t)}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={neighborhoodField}
                        onChangeText={t=>setNeighborhoodField(t)}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={numberHouseField}
                        onChangeText={t=>setNumberHouseField(t)}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={typeHouseField}
                        onChangeText={t=>setTypeHouseField(t)}
                        editable={this.state.permission}
                    />
                    {Complement}
                    <SignInputProfile
                        value={cityField}
                        onChangeText={t=>setCityField(t)}
                        editable={this.state.permission}
                    />
                    <SignInputProfile
                        value={stateField}
                        onChangeText={t=>setStateField(t)}
                        editable={this.state.permission}
                    />
                    <SignMessageButton onPress={handleMessageButtonClick}>
                        <SignMessageButtonText>Sair</SignMessageButtonText>
                    </SignMessageButton>
                </InputArea>
            </Scroller>
        </Container>
    );
};