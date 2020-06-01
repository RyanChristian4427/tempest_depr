import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/modules/auth';
import userOptions from '@/store/modules/user-options';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        userOptions,
    },
    plugins: [
        createPersistedState({
            paths: ['auth', 'userOptions'],
        }),
    ],
});
