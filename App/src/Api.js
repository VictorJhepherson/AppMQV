const BASE_API = 'https://git.heroku.com/projectmqv-webapi.git';

export default {
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/login/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    signIn: async (SU_LOGINNAME, SU_PASSWORD) => {
        console.log(SU_LOGINNAME);
        console.log(SU_PASSWORD);
        console.log(`${BASE_API}/login`);
        const req = await fetch(`${BASE_API}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({SU_LOGINNAME, SU_PASSWORD})
        });
        console.log(req);
        const json = await req.json();
        return json;
    },
    signUp: async (USR_NAME, SU_LOGINNAME, SU_PASSWORD) => {
        const req = await fetch(`${BASE_API}/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({USR_NAME, SU_LOGINNAME, SU_PASSWORD})
        });
        const json = await req.json();
        return json;
    }
};