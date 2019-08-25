import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/modules/auth';
import userOptions from '@/store/modules/user-options';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        userOptions,
    },
});
