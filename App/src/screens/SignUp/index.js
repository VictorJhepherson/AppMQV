import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';        
import { Container, InputArea, CustomButton, CustomButtonText, SignMessageButton, SignMessageButtonText, 
            SignMessageButtonTextBold, Scroller, SingInputText, ButtonImageText, ButtonImage } from './styles';
import AsyncStorage from "@react-native-community/async-storage";
import { UserContext } from '../../contexts/UserContext';
import { Picker } from '@react-native-community/picker';
import TextInputMaskArea from '../../components/TextInputMaskedArea';

import Api from '../../Api';

import SignInput from '../../components/SignInput';

import MQVLogo from '../../assets/MQVLogo.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

export default () => {
    const styles = StyleSheet.create({
        Picker: {
            width: 300,
            height: 60,
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            borderRadius: 30,
            paddingLeft: 15,
            alignItems: "center",
            marginBottom: 15
        },
        PickerComponent: {
            flex: 1,
            fontSize: 16,
            color: "#000000",
            marginLeft: 10
        },
        TextMasked: {
            flex: 1,
            fontSize: 16,
            color: "#000000",
            marginLeft: 10
        }
    });

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setpasswordField] = useState('');
    const [telField, setTelField] = useState('');
    const [cpfField, setCPFField] = useState('');
    const [rgField, setRGField] = useState('');
    const [ageField, setAgeField] = useState('');
    const [selectedValueChurchs, setSelectedChurchs] = useState([
        { CHURCH_ID: 0, CHURCH_DESC: 'Selecione uma opção*' }
    ]);
    const [listChurchs, setListChurchs] = useState(selectedValueChurchs);


    const [streetField, setstreetField] = useState('');
    const [neighborhoodField, setneighborhoodField] = useState('');
    const [numberhouseField, setnumberhouseField] = useState('');
    const [complementField, setcomplementField] = useState('');
    const [cityField, setcityField] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedValueTypeHouse, setSelectedTypeHouse] = useState([
        { TYPEHOUSE_ID: 0, TYPEHOUSE_DESC: 'Selecione uma opção*' }
    ]);
    const [listTypeHouse, setListTypeHouse] = useState(selectedValueTypeHouse);


    const handleSignClick = async () => {
        if(nameField != '' && ageField != '' && emailField != '' && passwordField != '' && selectedValueChurchs != 0 
            && cpfField != '' && rgField != '' && streetField != '' && neighborhoodField != '' && numberhouseField != ''
                && cityField != '' && selectedValue != 0) {
            let json = await Api.signUp(nameField, ageField, telField, selectedValueChurchs, cpfField, rgField, streetField, 
                                            neighborhoodField, numberhouseField, complementField, cityField, selectedValue,
                                                emailField, passwordField);
            if(json.token) {
                await AsyncStorage.setItem('token', json.token);
                const data = JSON.stringify(json);
                await AsyncStorage.setItem('user', json.data.USR_ID.toString());

                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: data.USR_PHOTO
                    }
                });

                navigation.navigate('MainTab');
            } else {
                alert("Erro: " + res.error);
            }
        } else {
            alert("Preencha os campos obrigatórios");
        }
    };

    const handleMessageButtonClick = () => {
        navigation.navigate('SignIn')
    };

    const getChurchs = async () => {
        let res = await Api.getChurchs();
        if(res.data != null) {
            let json = [...selectedValueChurchs, { CHURCH_ID: res.data[0].CHURCH_ID, CHURCH_DESC: res.data[0].CHURCH_DESC }];
            for(var i = 1; i < res.data.length; i++){
                json.push([{ CHURCH_ID: res.data[i].CHURCH_ID, CHURCH_DESC: res.data[i].CHURCH_DESC }]);
            }
            setListChurchs(json);
        } else {
            alert("Erro: "+ res.error);
        }
    };

    useEffect(() => {
        getChurchs();
    }, []);

    return (
        <Container>
            <MQVLogo width="100%" height="160"/>
            <SingInputText>Dados Cadastrais</SingInputText>
            <Scroller>
                <InputArea>
                    <SignInput 
                        IconSvg={PersonIcon} 
                        placeholder="Digite seu nome*"
                        value={nameField}
                        onChangeText={t=>setNameField(t)}
                    />
                    <SignInput 
                        IconSvg={EmailIcon} 
                        placeholder="Digite seu e-mail*"
                        value={emailField}
                        onChangeText={t=>setEmailField(t)}
                    />
                    <SignInput 
                        IconSvg={LockIcon} 
                        placeholder="Digite sua senha*"
                        value={passwordField}
                        onChangeText={t=>setpasswordField(t)}
                        password={true}
                    />
                    <TextInputMaskArea
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99)'
                        }}
                        placeholder="Digite seu telefone"
                        placeholderTextColor="#000000"
                        style={styles.TextMasked}
                        value={telField}
                        onChangeText={t=>setTelField(t)}
                    />
                    <TextInputMaskArea
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        placeholder="Data de nascimento*"
                        placeholderTextColor="#000000"
                        value={ageField}
                        style={styles.TextMasked}
                        onChangeText={t=>setAgeField(t)}
                    />
                    <Picker 
                        style={styles.Picker}
                        selectedValue={selectedValueChurchs}                     
                        onValueChange={(itemValue, itemIndex) => setSelectedChurchs(itemValue)}
                    >
                        {listChurchs.map((item, k) => {
                            return (<Picker.Item key={k} value={item.CHURCH_ID} label={item.CHURCH_DESC} style={styles.PickerComponent}/>)
                        })}
                    </Picker>
                    <TextInputMaskArea
                        type={'cpf'}
                        value={cpfField}
                        placeholder="Digite seu CPF*"
                        placeholderTextColor="#000000"
                        style={styles.TextMasked}
                        onChangeText={t=>setCPFField(t)}
                    />
                     <TextInputMaskArea
                        type={'only-numbers'}
                        value={rgField}
                        maxLength={9}
                        placeholder="Digite seu RG*"
                        placeholderTextColor="#000000"
                        style={styles.TextMasked}
                        onChangeText={t=>setRGField(t)}
                    />
                    <SignInput 
                        IconSvg={LockIcon} 
                        placeholder="Rua*"
                        value={streetField}
                        onChangeText={t=>setstreetField(t)}
                    />
                    <SignInput 
                        IconSvg={LockIcon} 
                        placeholder="Bairro*"
                        value={neighborhoodField}
                        onChangeText={t=>setneighborhoodField(t)}
                    />
                    <SignInput 
                        IconSvg={LockIcon} 
                        placeholder="Número*"
                        value={numberhouseField}
                        onChangeText={t=>setnumberhouseField(t)}
                    />
                    <SignInput 
                        IconSvg={LockIcon} 
                        placeholder="Complemento"
                        value={complementField}
                        onChangeText={t=>setcomplementField(t)}
                    />
                    <Picker
                        style={styles.Picker}
                        selectedValue={selectedValueTypeHouse}                     
                        onValueChange={(itemValue, itemIndex) => setSelectedTypeHouse(itemValue)}
                    >
                        <Picker.Item value='1' label='Casa' style={styles.PickerComponent} />
                        <Picker.Item value='2'label='Apartamento' style={styles.PickerComponent} />
                    </Picker>
                    <SignInput 
                        IconSvg={LockIcon} 
                        placeholder="Cidade*"
                        value={cityField}
                        onChangeText={t=>setcityField(t)}
                    />
                    <Picker
                        style={styles.Picker}
                        selectedValue={selectedValue}                     
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item value='Estado' label='Estado*' style={styles.PickerComponent} />
                        <Picker.Item value='Acre' label='Acre' style={styles.PickerComponent} />
                        <Picker.Item value='Alagoas' label='Alagoas' style={styles.PickerComponent} />
                        <Picker.Item value='Amapá' label='Amapá' style={styles.PickerComponent} />
                        <Picker.Item value='Amazonas' label='Amazonas' style={styles.PickerComponent} />
                        <Picker.Item value='Bahia' label='Bahia' style={styles.PickerComponent} />
						<Picker.Item value='Ceará' label='Ceará' style={styles.PickerComponent}/>
						<Picker.Item value='Distrito Federal' label='Distrito Federal' style={styles.PickerComponent}/>
						<Picker.Item value='Espírito Santo' label='Espírito Santo' style={styles.PickerComponent}/>
						<Picker.Item value='Goiás' label='Goiás' style={styles.PickerComponent}/>
						<Picker.Item value='Maranhão' label='Maranhão' style={styles.PickerComponent}/>
						<Picker.Item value='Mato Grosso' label='Mato Grosso' style={styles.PickerComponent}/>
						<Picker.Item value='Mato Grosso do Sul' label='Mato Grosso do Sul' style={styles.PickerComponent}/>
						<Picker.Item value='Minas Gerais' label='Minas Gerais' style={styles.PickerComponent}/>
						<Picker.Item value='Pará' label='Pará' style={styles.PickerComponent}/>
						<Picker.Item value='Paraíba' label='Paraíba' style={styles.PickerComponent}/>
						<Picker.Item value='Pernambuco' label='Pernambuco' style={styles.PickerComponent}/>
						<Picker.Item value='Piauí' label='Piauí' style={styles.PickerComponent}/>
						<Picker.Item value='Rio de Janeiro' label='Rio de Janeiro' style={styles.PickerComponent}/>
						<Picker.Item value='Rio Grande do Norte' label='Rio Grande do Norte' style={styles.PickerComponent}/>
						<Picker.Item value='Rio Grande do Sul' label='Rio Grande do Sul' style={styles.PickerComponent}/>
						<Picker.Item value='Rondônia' label='Rondônia' style={styles.PickerComponent}/>
						<Picker.Item value='Roraima' label='Roraima' style={styles.PickerComponent}/>
						<Picker.Item value='Santa Catarina' label='Santa Catarina' style={styles.PickerComponent}/>
						<Picker.Item value='São Paulo' label='São Paulo' style={styles.PickerComponent}/>
						<Picker.Item value='Sergipe' label='Sergipe' style={styles.PickerComponent}/>
						<Picker.Item value='Tocantins' label='Tocantins' style={styles.PickerComponent} />
                    </Picker>
                    <CustomButton onPress={handleSignClick}>
                        <CustomButtonText>CADASTRAR</CustomButtonText>
                    </CustomButton>
                    <SignMessageButton onPress={handleMessageButtonClick}>
                        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
                    </SignMessageButton>
                </InputArea>
            </Scroller>
        </Container>
    );
}