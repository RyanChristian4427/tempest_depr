<template>
    <b-navbar>
        <template slot="end">
            <b-dropdown position="is-bottom-left">
                <a class="navbar-item" slot="trigger">
                    <span>Menu</span>
                    <b-icon icon="menu-down"></b-icon>
                </a>

                <b-dropdown-item custom>
                    Logged in as <b>{{ user.getName() }}</b>
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
    import { mapGetters, mapActions } from 'vuex';
    import { AUTH_LOGOUT, AUTH_CURRENT_USER } from '@/store/actions/auth';
    import User from '@/models/user';

    export default {
        name: 'Toolbar.vue',
        computed: {
            ...mapGetters(
                ['currentUser'],
            ),
            user(this: { currentUser: User }) {
                return this.currentUser;
            },
        },
        methods: {
            ...mapActions(
                [AUTH_LOGOUT],
            ),
            logout(this: { AUTH_LOGOUT: any, $router: any }) {
                this.AUTH_LOGOUT()
                    .then(() => this.$router.push({ name: 'Login' }));
            }
        }
    };
</script>

<style scoped lang="scss">
    .navbar {
        background-color: transparent !important;
    }
</style>
