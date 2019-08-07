import {
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    AUTH_LOGOUT,
    AUTH_REGISTER,
} from '@/store/actions/auth';

import {AuthState} from '@/store/types/auth';
import ApiService from '@/services/api.axios';
import JwtService from '@/services/jwt-service';
import User from '@/models/user';


const state: AuthState = {
    user: {} as User,
    status: '',
    errors: {} as string,
    authenticated: !!JwtService.getToken(),
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
            // commit(AUTH_ERROR, 'Unknown Error');

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
    [AUTH_REQUEST]: (state: AuthState) => {
        state.status = 'Logging in';
        state.errors = '';
    },
    [AUTH_SUCCESS]: (state: AuthState, token: string) => {
        state.status = 'Logged in';
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        state.user = new User(tokenData.name, tokenData.email, token);
        state.authenticated = true;
    },
    [AUTH_ERROR]: (state: AuthState, error: string) => {
        state.errors = error;
    },
    [AUTH_LOGOUT]: (state: AuthState) => {
        state.user = {} as User;
        state.status = '';
        state.errors = '';
        state.authenticated = false;
        JwtService.destroyToken();
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
