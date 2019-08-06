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
    [AUTH_REQUEST]: (commit: any, credentials: { email: string, password: string}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            ApiService.post('auth/login', credentials)
                .then(({ data }) => {
                    commit(AUTH_SUCCESS, data.token);
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
    [AUTH_LOGOUT]: (commit: any) => {
        commit(AUTH_LOGOUT);
    },
    [AUTH_REGISTER]: (commit: any, credentials: any) => {
        // TODO: add registration
    },
};

const mutations = {
    [AUTH_REQUEST]: (state: any) => {
        state.status = 'Logging in';
    },
    [AUTH_SUCCESS]: (state: any, token: string) => {
        state.status = 'Logged in';
        const userData = JSON.parse(atob(token.split('.')[1]));
        state.user = new User(userData.name, userData.email, token);
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
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
