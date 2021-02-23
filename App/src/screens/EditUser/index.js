import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, UserImage, InputArea, Scroller, CustomButton, CustomButtonText, CustomButtonImage, CustomButtonImageText, PickerArea } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import InputUserEdit from '../../components/InputUserEdit';
import { Picker } from '@react-native-community/picker';
import TextInputMaskedArea from '../../components/TextInputMaskedArea';
import PasswordModal from '../../components/PasswordModal';
import PhotoModal from '../../components/PhotoModal';

import Api from '../../Api';
import AsyncStorage from "@react-native-community/async-storage";

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const styles = StyleSheet.create({
        Picker: {
            width: 280,
            height: 35,
            backgroundColor: "#FFFFFF",
            flexDirection: "row",
            paddingLeft: 15,
            alignItems: "center",
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
        USR_PHOTO: route.params.USR_PHOTO,
        CHURCH_ID: route.params.CHURCH_ID,
        CHURCH_DESC: route.params.CHURCH_DESC,
        TYPEHOUSE_ID: route.params.TYPEHOUSE_ID,
        TYPEHOUSE_DESC: route.params.TYPEHOUSE_DESC,
        STATES_ID: route.params.STATES_ID,
        STATES_DESC: route.params.STATES_DESC,
        USRTYPE: route.params.USRTYPE,
        USRTYPE_DESC: route.params.USRTYPE_DESC
    });

    var i = 0;
    var rgFormated = '';
    var um = '';
    var dois = '';
    var tres = '';
    var dv = '';

    const [numberHouse, setNumberHouse] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [userStatus2, setUserStatus2] = useState('');
    const [userStatusValue, setUserStatusValue] = useState(null);
    const [churchId, setChurchId] = useState(null);
    const [typeHouseId, setTypeHouseId] = useState(null);

    const [nameField, setNameField] = useState(null);
    const [dateField, setDateField] = useState(null);
    const [telField, setTelField] = useState(null);
    const [userStatusField, setUserStatusField] = useState(null);
    const [userType, setUserType] = useState(null);

    const [listStates, setListStates] = useState([]);
    const [listTypeHouse, setListTypeHouse] = useState([]);
    const [listChurchs, setListChurchs] = useState([]);
    const [listUserType, setListUserType] = useState([]);
    const [cpfField, setCPFField] = useState(null);
    const [rgField, setRGField] = useState(null);
    const [emailField, setEmailField] = useState(null);

    const [streetField, setStreetField] = useState(null);
    const [neighborhoodField, setNeighborhoodField] = useState(null);
    const [numberhouseField, setNumberhouseField] = useState(null);
    const [complementField, setComplementField] = useState(null);
    const [cityField, setCityField] = useState(null);
    const [instagramField, setInstagramField] = useState(null);
    const [facebookField, setFacebookField] = useState(null);
    const [stateSelectedValue, setStateSelectedValue] = useState(null);

    const [passwordModal, setPasswordModal] = useState(false);
    const [photoModal, setPhotoModal] = useState(false);

    const getUserProfile = async () => {
        let json = await Api.getUserProfile(userInfo.USR_ID);
        if(json.length < 1){
            alert(json.error);
        } else {
            json.data.map((item, k) => {
                setUserInfo(item);
                setNumberHouse(item.NUMBER_HOUSE.toString());
                if(item.USR_STATUS == 'A') {
                    setUserStatus('Ativo');
                    setUserStatus2('Inativo');
                    setUserStatusValue('I');
                } else {
                    setUserStatus('Inativo');
                    setUserStatus2('Ativo');
                    setUserStatusValue('A');
                }
            });
        }
    };

    const getChurchs = async () => {
        let res = await Api.getChurchs(userInfo.CHURCH_DESC);
        if(res.data != null) {
            res.data.map((item, k) => {
                if(item.length > 1){
                    listChurchs.push(<Picker.Item key={k} value={item.CHURCH_ID.toString()} label={item.CHURCH_DESC} style={styles.PickerComponent} />);
                } else {
                    setListChurchs(<Picker.Item key={k} value={item.CHURCH_ID.toString()} label={item.CHURCH_DESC} style={styles.PickerComponent} />);
                }
            });
        } else {
            setListChurchs(<Picker.Item value={userInfo.CHURCH_ID} label={userInfo.CHURCH_DESC} style={styles.PickerComponent} />);
        }
    };

    const getTypeHouse = async () => {
        let res = await Api.getTypeHouse(userInfo.TYPEHOUSE_DESC);
        if(res.data != null) {
            res.data.map((item, k) => {
                listTypeHouse.push(<Picker.Item key={k} value={item.TYPEHOUSE_ID.toString()} label={item.TYPEHOUSE_DESC} style={styles.PickerComponent} />);
            });
        } else {
            alert("Erro: "+ res.error);
        }
    };

    const getStates = async () => {
        let res = await Api.getStates(userInfo.STATES_DESC);;
        if(res.data != null) {
            res.data.map((item, k) => {
                listStates.push(<Picker.Item key={k} value={item.STATES_ID.toString()} label={item.STATES_DESC} style={styles.PickerComponent} />);
            });
        } else {
            alert("Erro: "+ res.error);
        }
    };

    const getUserType = async () => {
        let res = await Api.getUserType(userInfo.USRTYPE);;
        if(res.data != null) {
            res.data.map((item, k) => {
                listUserType.push(<Picker.Item key={k} value={item.USRTYPE.toString()} label={item.USRTYPE_DESC} style={styles.PickerComponent} />);
            });
        } else {
            alert("Erro: "+ res.error);
        }
    };

    const handleClickEdit = () => {
        setPhotoModal(true);
    };

    const handleClickPass = () => {
        setPasswordModal(true);
    };

    const handleClickSave = async () => {
        let usrIdRegUser = await AsyncStorage.getItem('user');
        if(rgField != null && rgField != ''){
            while(i < rgField.length){
                if(i < 2)
                    um += rgField[i];
                else if(i >= 2 && i <= 4)
                    dois += rgField[i];
                else if(i >= 5 && i <= 7)
                    tres += rgField[i];
                else if(i == 8){
                    dv += rgField[i];
                }
    
                i++;
            }
            rgFormated += um + '.' + dois + '.' + tres + '-' + dv;

            if(userInfo.USR_ID == '' || usrIdRegUser == '')
                alert('Não foi possível efetuar a alteração no usuário, faça o logout e login e depois tente novamente');
            else {
                let json = await Api.updateUser(
                    userInfo.USR_ID, nameField, dateField, telField, userStatusField, userType, churchId, cpfField, rgFormated, emailField, streetField, 
                    neighborhoodField, numberhouseField, complementField, cityField, stateSelectedValue, typeHouseId, usrIdRegUser
                );

                if(json.error != null){
                    alert('Não foi possível efetuar a alteração no usuário, tente novamente');
                } else {
                    navigation.reset({
                        routes: [{name: 'Youngs'}]
                    });
                }
            }
        } else {
            if(userInfo.USR_ID == '' || usrIdRegUser == '')
                alert('Não foi possível efetuar a alteração no usuário, faça o login novamente e depois tente novamente');
            else {
                let json = await Api.updateUser(
                    userInfo.USR_ID, nameField, dateField, telField, userStatusField, instagramField, facebookField, userType, churchId, cpfField, rgField, emailField, streetField, 
                    neighborhoodField, numberhouseField, complementField, cityField, stateSelectedValue, typeHouseId, usrIdRegUser
                );

                if(json.error != null){
                    alert('Não foi possível efetuar a alteração no usuário, tente novamente ou contate o administrador');
                } else {
                    navigation.reset({
                        routes: [{name: 'Youngs'}]
                    });
                }
            }
        }
    };

    useEffect(() => {
        getUserProfile();
        getChurchs();
        getTypeHouse();
        getStates();
        getUserType();
    }, [], [], [], [], []);

    return (
        <Container>
            <UserImage
                source={{
                    uri: userInfo.USR_PHOTO
                        ? userInfo.USR_PHOTO
                        : 'https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121233262-stock-illustration-male-default-placeholder-avatar-profile.jpg' 
                }}
            />
            <CustomButtonImage onPress={handleClickEdit}>
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
                    <PickerArea>
                        <Picker
                            style={styles.Picker}
                            selectedValue={userStatusField}                     
                            onValueChange={(itemValue, itemIndex) => setUserStatusField(itemValue)}
                        >
                            <Picker.Item value={userInfo.USR_STATUS} label={userStatus} style={styles.PickerComponent} />
                            <Picker.Item value={userStatusValue} label={userStatus2} style={styles.PickerComponent} />
                        </Picker>
                    </PickerArea>
                    <PickerArea>
                        <Picker 
                            style={styles.Picker}
                            selectedValue={userType}                     
                            onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
                        >        
                            <Picker.Item value={userInfo.USRTYPE} label={userInfo.USRTYPE_DESC} style={styles.PickerComponent} />               
                            {listUserType}
                        </Picker>
                    </PickerArea>
                    <PickerArea>
                        <Picker 
                            style={styles.Picker}
                            selectedValue={churchId}                     
                            onValueChange={(itemValue, itemIndex) => setChurchId(itemValue)}
                        >        
                            <Picker.Item value={userInfo.CHURCH_ID} label={userInfo.CHURCH_DESC} style={styles.PickerComponent} />               
                        </Picker>
                    </PickerArea>
                    <TextInputMaskedArea
                        type={'cpf'}
                        value={cpfField}
                        placeholder={userInfo.USRDOC_CPFNUMBER}
                        placeholderTextColor="#000000"
                        style={styles.TextMasked}
                        onChangeText={t=>setCPFField(t)}
                    />
                     <TextInputMaskedArea
                        type={'only-numbers'}
                        value={rgField}
                        maxLength={9}
                        placeholder={userInfo.USRDOC_RGNUMBER}
                        placeholderTextColor="#000000"
                        style={styles.TextMasked}
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
                    <PickerArea>
                        <Picker
                            style={styles.Picker}
                            selectedValue={stateSelectedValue}                     
                            onValueChange={(itemValue, itemIndex) => setStateSelectedValue(itemValue)}
                        >
                            <Picker.Item value={userInfo.STATES_ID} label={userInfo.STATES_DESC} style={styles.PickerComponent} />
                            {listStates}
                        </Picker>
                    </PickerArea>
                    <PickerArea>
                        <Picker 
                            style={styles.Picker}
                            selectedValue={typeHouseId}                     
                            onValueChange={(itemValue, itemIndex) => setTypeHouseId(itemValue)}
                        >             
                            <Picker.Item value={userInfo.TYPEHOUSE_ID} label={userInfo.TYPEHOUSE_DESC} style={styles.PickerComponent} />          
                            {listTypeHouse}
                        </Picker>
                    </PickerArea>
                    <InputUserEdit
                        placeholder={userInfo.USR_INSTAGRAM}
                        value={instagramField}
                        onChangeText={t=>setInstagramField(t)}
                    />
                     <InputUserEdit
                        placeholder={userInfo.USR_FACEBOOK}
                        value={facebookField}
                        onChangeText={t=>setFacebookField(t)}
                    />
                    <CustomButton onPress={handleClickPass}>
                        <CustomButtonText>Alterar senha</CustomButtonText>
                    </CustomButton>
                    <CustomButton onPress={handleClickSave}>
                        <CustomButtonText>Salvar</CustomButtonText>
                    </CustomButton>
                </InputArea>
            </Scroller>

            <PasswordModal 
                show={passwordModal}
                setShow={setPasswordModal}
                value={userInfo.USR_ID}
            />
            <PhotoModal 
                show={photoModal}
                setShow={setPhotoModal}
                value={userInfo.USR_ID}
            />
        </Container>
    );
};