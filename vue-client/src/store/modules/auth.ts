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
    [AUTH_REQUEST]: ({ commit }: any, credentials: { user: { email: string, password: string }}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            ApiService.post('users/login', credentials)
                .then(({ data }) => {
                    commit(AUTH_SUCCESS, data.user);
                    ApiService.setHeader();
                    resolve(data);
                })
                .catch(({ response }) => {
                    if (response !== undefined) {
                        commit(AUTH_ERROR, response.data.errors);
                        reject(response.data.errors);
                    } else {
                        commit(AUTH_ERROR, 'Unknown Error');
                        reject('Unknown Error');
                    }
                });
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
    [AUTH_SUCCESS]: (state: AuthState, user: { email: string, first_name: string,
                                                last_name: string, token: string} ) => {
        state.status = 'Logged in';
        state.user = new User(user.first_name + ' ' + user.last_name, user.email, user.token);
        state.authenticated = true;
        JwtService.saveToken(user.token);
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
