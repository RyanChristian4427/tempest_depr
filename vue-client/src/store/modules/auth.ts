import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    AUTH_LOGOUT,
    AUTH_REGISTER,
} from '@/store/actions/auth';
import User from '@/models/user';
import ApiService from '@/services/api.axios';
import JwtService from '@/services/jwt-service';

const state = {
    user: null,
    status: '',
    isAuthenticated: !!JwtService.getToken(),
};

const getters = {
    currentUser(state: { user: any; }) {
        return state.user;
    },
    isAuthenticated(state: { isAuthenticated: boolean; }) {
        return state.isAuthenticated;
    },
    status(state: { status: any }) {
        return state.status;
    },
};

const actions = {
    [AUTH_REQUEST]: ({ commit }: any, credentials: { email: string, password: string}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);

            // TEMP MOCK
            const data = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6Imp' +
                'vaG5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.MmQCu6FE_g6zULEQWXgmlClbqUas6Q7HUKVaOFLW4Ds' };
            commit(AUTH_SUCCESS, data.token);
            resolve(data);

            // ApiService.post('auth/login', credentials)
            //     .then(({ data }) => {
            //         commit(AUTH_SUCCESS, data.token);
            //         ApiService.setHeader();
            //         resolve(data);
            //     })
            //     .catch(({ response }) => {
            //         if (response !== undefined) {
            //             commit(AUTH_ERROR, response.data.errors);
            //             reject(response.data.errors);
            //         } else {
            //             commit(AUTH_ERROR, 'Unknown Error');
            //             reject('Unknown Error');
            //         }
            //     });
        });

    },
    [AUTH_LOGOUT]: ({ commit }: any) => {
        commit(AUTH_LOGOUT);
    },
};

const mutations = {
    [AUTH_REQUEST]: (state: any) => {
        state.status = 'Logging in';
    },
    [AUTH_SUCCESS]: (state: any, token: string) => {
        state.status = 'Logged in';
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        state.user = new User(tokenData.name, tokenData.email, token);
        state.isAuthenticated = true;
    },
    [AUTH_ERROR]: (state: any, error: string) => {
        state.status = 'Error: ' + error;
    },
    [AUTH_LOGOUT]: (state: any) => {
        state.user = null;
        state.status = '';
        state.isAuthenticated = false;
        JwtService.destroyToken();
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
