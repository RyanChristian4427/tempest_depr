<template>
    <b-navbar>
        <template slot="end">
            <b-dropdown position="is-bottom-left">
                <a class="navbar-item" slot="trigger">
                    <span>Menu</span>
                    <b-icon icon="menu-down"></b-icon>
                </a>

                <b-dropdown-item custom>
                    Logged in as <b>{{ user.name }}</b>
                </b-dropdown-item>

                <b-dropdown-item value="home">
                    <b-icon icon="home"></b-icon>
                    Home
                </b-dropdown-item>

                <hr class="dropdown-divider">

                <b-dropdown-item value="settings">
                    <b-icon icon="settings"></b-icon>
                    Settings
                </b-dropdown-item>

                <b-dropdown-item value="logout" @click="logout">
                    <b-icon icon="logout"></b-icon>
                    Logout
                </b-dropdown-item>
            </b-dropdown>
        </template>
    </b-navbar>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import User from '@/models/user';
    import { Action, Getter } from 'vuex-class';
    import { AUTH_LOGOUT } from '@/store/actions/auth';

    @Component
    export default class Toolbar extends Vue {
        @Getter('currentUser') private currentUser!: User;
        @Action(AUTH_LOGOUT) private AUTH_LOGOUT: any;


        // Computed
        get user() {
            return this.currentUser;
        }

        // Methods
        public logout() {
            this.AUTH_LOGOUT()
                .then(async () => await this.$router.push({ name: 'Login' }));
        }
    }
</script>

<style scoped lang="scss">
    .navbar {
        background-color: transparent !important;
    }
</style>
