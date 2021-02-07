import AsyncStorage from '@react-native-community/async-storage';
const BASE_API = 'https://projectmqv-webapi.herokuapp.com';

export default {
    checkToken: async (token, user) => {
        const req = await fetch(`${BASE_API}/login/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({token, user})
        });
        const json = await req.json();
        return json;
    },
    signIn: async (SU_LOGINNAME, SU_PASSWORD) => {
        const req = await fetch(`${BASE_API}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({SU_LOGINNAME, SU_PASSWORD})
        });
        const json = await req.json();

        return json;
    },
    signUp: async (USR_NAME, USR_PHOTO, USR_DATEBIRTHDAY, USR_PHONENUMBER, USRDOC_CPFNUMBER, USRDOC_RGNUMBER, 
                    STREET, NEIGHBORHOOD, NUMBER_HOUSE, COMPLEMENT, TYPEHOUSE, CITY, STATE, SU_LOGINNAME, SU_PASSWORD) => {
        const req = await fetch(`${BASE_API}/users/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({USR_NAME, USR_PHOTO, USR_DATEBIRTHDAY, USR_PHONENUMBER, CHURCH_ID, 
                                    USRDOC_CPFNUMBER, USRDOC_RGNUMBER, STREET, NEIGHBORHOOD, NUMBER_HOUSE, COMPLEMENT, 
                                        TYPEHOUSE, CITY, STATE, SU_LOGINNAME, SU_PASSWORD})
        });
        const json = await req.json();
        return json;
    },
    signOut: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/login/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();

        return json;
    },
    getWarnings: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/warning`, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
    getChurchs: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/dropDown/combo-churchs`, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
    getTypeHouse: async () => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/dropDown/combo-typehouse`, {
            headers: {
                "Authorization": 'Baerer ' + token
            }
        });
        const json = await req.json();
        return json;
    },
    getUserProfile: async (USR_ID) => {
        const token = await AsyncStorage.getItem('token');
        const req = await fetch(`${BASE_API}/users/getUserProfile`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": 'Baerer ' + token
            },
            body: JSON.stringify({USR_ID})
        });
        const json = await req.json();
        return json;
    }
};