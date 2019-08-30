import { UserOptionsState } from '@/store/types/user-options';

const state: UserOptionsState = {
    emailsPerPage: 50,
};

const getters = {
    emailsPerPage(state: UserOptionsState) {
        return state.emailsPerPage;
    },
};

export default {
    state,
    getters,
};
