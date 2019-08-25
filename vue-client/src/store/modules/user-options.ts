import { UserOptionsState } from '@/store/types/user-options';

const state: UserOptionsState = {
    emailsPerPage: 4,
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
