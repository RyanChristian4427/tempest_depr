import {
    USER_OPTIONS_REQUEST,
    USER_OPTIONS_SUCCESS,
    OPTIONS_ERROR,
} from '@/store/actions/user-options';

import {
    UserOptionsState,
    OptionsSuccessResponse,
} from '@/store/types/user-options';

import {apiService} from 'ts-api-toolkit';

const state: UserOptionsState = {
    emailsPerPage: 50,
};

const getters = {
    emailsPerPage(state: UserOptionsState) {
        return state.emailsPerPage;
    },
};

const actions = {
    [USER_OPTIONS_REQUEST]({commit}: any) {
        return new Promise((resolve, reject) => {
            apiService.get('user/options')
                .then(({data}) => {
                    commit(USER_OPTIONS_SUCCESS, data.user_options);
                    resolve(data);
                })
                .catch(({response}) => {
                    if (response !== undefined) {
                        commit(OPTIONS_ERROR, response.data.errors);
                        reject(response.data.errors);
                    } else {
                        commit(OPTIONS_ERROR, 'Unknown Error');
                        reject('Unknown Error');
                    }
                });
        });
    },
};

const mutations = {
    [USER_OPTIONS_SUCCESS]: (state: UserOptionsState, userOptions: OptionsSuccessResponse ) => {
        state.emailsPerPage = userOptions.emails_per_page;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
