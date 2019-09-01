import {
    AUTH_REQUEST,
    AUTH_FIRST_TIME,
    AUTH_SUCCESS,
    AUTH_ERROR,
    AUTH_LOGOUT,
    AUTH_REGISTER,
} from '@/store/actions/auth';

import {
    AuthState,
    AuthSuccessResponse,
    LoginUser,
    RegisterUser,
} from '@/store/types/auth';

import ApiService from '@/services/api-service';
import JwtService from '@/services/jwt-service';
import User from '@/models/user';


const state: AuthState = {
    user: {} as User,
    status: '',
    errors: '',
    authenticated: !!JwtService.getToken(),
};

const getters = {
    currentUser(state: AuthState) {
        return state.user;
    },
    isAuthenticated(state: AuthState) {
        return state.authenticated;
    },
    status(state: AuthState) {
        return state.status;
    },
    errors(state: AuthState) {
        return state.errors;
    },
};

const actions = {
    [AUTH_REQUEST]({ commit }: any, credentials: LoginUser) {
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
    [AUTH_ERROR]({ commit }: any, error: string) {
        commit(AUTH_ERROR, error);
    },
    [AUTH_LOGOUT]({ commit }: any) {
        commit(AUTH_LOGOUT);
    },
    [AUTH_REGISTER]({ commit }: any, credentials: RegisterUser) {
        return new Promise((resolve, reject) => {
            ApiService.post('users/register', credentials)
                .then(({ data }) => {
                    commit(AUTH_SUCCESS, data.user);
                    resolve(data);
                })
                .catch(({ response }) => {
                    commit(AUTH_ERROR, response.data.errors);
                    reject(response);
                });
        });
    },
};

const mutations = {
    [AUTH_REQUEST]: (state: AuthState) => {
        state.status = 'Logging in';
        state.errors = '';
    },
    [AUTH_FIRST_TIME]: (state: AuthState) => {
        state.status = 'First time user';
    },
    [AUTH_SUCCESS]: (state: AuthState, user: AuthSuccessResponse ) => {
        state.status = 'Logged in';
        state.user = new User(user.first_name + ' ' + user.last_name, user.email, user.token);
        state.authenticated = true;
        JwtService.saveToken(user.token);
    },
    [AUTH_ERROR]: (state: AuthState, error: string) => {
        state.status = '';
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
