import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, UserImage, InputArea, Scroller, CustomButton, CustomButtonText, CustomButtonImage, CustomButtonImageText } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import InputUserEdit from '../../components/InputUserEdit';
import { Picker } from '@react-native-community/picker';
import TextInputMaskedArea from '../../components/TextInputMaskedArea';

import Api from '../../Api';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

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

    const [userInfo, setUserInfo] = useState({
        USR_ID: route.params.USR_ID,
        USR_NAME: route.params.USR_NAME,
        USR_PHOTO: route.params.USR_PHOTO
    });

    const [numberHouse, setNumberHouse] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [userStatus2, setUserStatus2] = useState('');
    const [userStatusValue, setUserStatusValue] = useState('');
    const [churchId, setChurchId] = useState('');
    const [state, setState] = useState('');
    const [typeHouse, setTypeHouse] = useState('');
    const [typeHouse2, setTypeHouse2] = useState('');
    const [typeHouseValue, setTypeHouseValue] = useState('');

    const [nameField, setNameField] = useState('');
    const [dateField, setDateField] = useState('');
    const [telField, setTelField] = useState('');
    const [userStatusField, setUserStatusField] = useState('');
    const [userType, setUserType] = useState('');

    const [listChurchs, setListChurchs] = useState([]);
    const [cpfField, setCPFField] = useState('');
    const [rgField, setRGField] = useState('');
    const [emailField, setEmailField] = useState('');

    const [streetField, setStreetField] = useState('');
    const [neighborhoodField, setNeighborhoodField] = useState('');
    const [numberhouseField, setNumberhouseField] = useState('');
    const [complementField, setComplementField] = useState('');
    const [cityField, setCityField] = useState('');
    const [stateSelectedValue, setStateSelectedValue] = useState('');
    const [typeHouseField, setTypeHouseField] = useState('');

    const [passwordField, setpasswordField] = useState('');

    const getUserProfile = async () => {
        let json = await Api.getUserProfile(userInfo.USR_ID);
        if(json.length < 1){
            alert(json.error);
        } else {
            json.data.map((item, k) => {
                setUserInfo(item);
                setNumberHouse(item.NUMBER_HOUSE.toString());
                setState(item.STATE);
                setTypeHouse(item.TYPEHOUSE_DESC);
                if(item.USR_STATUS == 'A') {
                    setUserStatus('Ativo');
                    setUserStatus2('Inativo');
                    setUserStatusValue('I');
                } else {
                    setUserStatus('Inativo');
                    setUserStatus2('Ativo');
                    setUserStatusValue('A');
                }
                if(item.TYPEHOUSE_DESC == 'Apartamento') {
                    setTypeHouse2('Casa');
                    setTypeHouseValue('1');
                } else {
                    setTypeHouse2('Apartamento');
                    setTypeHouseValue('2');
                }
            });
        }
    };

    const getChurchs = async () => {
        let res = await Api.getChurchs();
        if(res.data != null) {
            res.data.map((item, k) => {
                setListChurchs(<Picker.Item key={k} value={item.CHURCH_ID.toString()} label={item.CHURCH_DESC} style={styles.PickerComponent} />)
            });
        } else {
            alert("Erro: "+ res.error);
        }
    };

    const handleButtonImage = async () => {

    }

    const handleClickSave = async () => {
        navigation.reset({
            routes: [{name: 'Youngs'}]
        });
    };

    useEffect(() => {
        getUserProfile();
        getChurchs();
    }, [], []);

    return (
        <Container>
            <UserImage
                source={{
                    uri: userInfo.USR_PHOTO
                        ? userInfo.USR_PHOTO
                        : 'https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121233262-stock-illustration-male-default-placeholder-avatar-profile.jpg' 
                }}
            />
            <CustomButtonImage onPress={handleButtonImage}>
                <CustomButtonImageText>Alterar foto do perfil</CustomButtonImageText>
            </CustomButtonImage>
            <Scroller>
                <InputArea>
                    <InputUserEdit
                        placeholder={userInfo.USR_NAME}
                        value={nameField}
                        onChangeText={t=>setNameField(t)}                      
                    />  
                    <TextInputMaskedArea
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        placeholder={userInfo.USR_DATEBIRTHDAY}
                        placeholderTextColor="#000000"
                        value={dateField}
                        style={styles.TextMasked}
                        onChangeText={t=>setDateField(t)}
                    />
                    <TextInputMaskedArea
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99)'
                        }}
                        placeholder={userInfo.USR_PHONENUMBER}
                        placeholderTextColor="#000000"
                        style={styles.TextMasked}
                        value={telField}
                        onChangeText={t=>setTelField(t)}
                    />
                    <Picker
                        style={styles.Picker}
                        selectedValue={userStatusField}                     
                        onValueChange={(itemValue, itemIndex) => setUserStatusField(itemValue)}
                    >
                        <Picker.Item value={userInfo.USR_STATUS} label={userStatus} style={styles.PickerComponent} />
                        <Picker.Item value={userStatusValue} label={userStatus2} style={styles.PickerComponent} />
                    </Picker>
                    <InputUserEdit
                        placeholder={userInfo.USRTYPE_DESC}
                        value={userType}
                        onChangeText={t=>setUserType(t)}
                    />
                    <Picker 
                        style={styles.Picker}
                        selectedValue={churchId}                     
                        onValueChange={(itemValue, itemIndex) => setChurchId(itemValue)}
                    >                       
                        {listChurchs}
                    </Picker>
                    <InputUserEdit
                        placeholder={userInfo.USRDOC_CPFNUMBER}
                        value={cpfField}
                        onChangeText={t=>setCPFField(t)}
                    />
                    <InputUserEdit
                        placeholder={userInfo.USRDOC_RGNUMBER}
                        value={rgField}
                        onChangeText={t=>setRGField(t)}
                    />
                    <InputUserEdit
                        placeholder={userInfo.SU_LOGINNAME}
                        value={emailField}
                        onChangeText={t=>setEmailField(t)}
                    />
                    <InputUserEdit
                        placeholder={userInfo.STREET}
                        value={streetField}
                        onChangeText={t=>setStreetField(t)}
                    />
                    <InputUserEdit
                        placeholder={userInfo.NEIGHBORHOOD}
                        value={neighborhoodField}
                        onChangeText={t=>setNeighborhoodField(t)}
                    />
                    <InputUserEdit
                        placeholder={numberHouse}
                        value={numberhouseField}
                        onChangeText={t=>setNumberhouseField(t)}
                    />
                    <InputUserEdit
                        placeholder={userInfo.COMPLEMENT}
                        value={complementField}
                        onChangeText={t=>setComplementField(t)}
                    />
                    <InputUserEdit
                        placeholder={userInfo.CITY}
                        value={cityField}
                        onChangeText={t=>setCityField(t)}
                    />
                    <Picker
                        style={styles.Picker}
                        selectedValue={stateSelectedValue}                     
                        onValueChange={(itemValue, itemIndex) => setStateSelectedValue(itemValue)}
                    >
                        <Picker.Item value={state} label={state} style={styles.PickerComponent} />
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
                    <Picker
                        style={styles.Picker}
                        selectedValue={typeHouseField}                     
                        onValueChange={(itemValue, itemIndex) => setTypeHouseField(itemValue)}
                    >
                        <Picker.Item value={userInfo.TYPEHOUSE_DESC} label={typeHouse} style={styles.PickerComponent} />
                        <Picker.Item value={typeHouseValue} label={typeHouse2} style={styles.PickerComponent} />
                    </Picker>

                    <CustomButton onPress={handleClickSave}>
                        <CustomButtonText>SALVAR</CustomButtonText>
                    </CustomButton>
                </InputArea>
            </Scroller>
        </Container>
    );
};