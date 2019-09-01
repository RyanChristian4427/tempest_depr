<template>
    <div>
        <section class="hero is-small is-bold">
            <div class="hero-body">
                <h1 class="title">Login</h1>
            </div>
        </section>
        <section>
            <div class="card">
                <div class="container" id="layered-background">
                    <b-field label="Email">
                        <b-input type="email" v-model="user.email" placeholder="Email input"/>
                    </b-field>
                    <b-field label="Password">
                        <b-input type="password" v-model="user.password" placeholder="Password"/>
                    </b-field>
                    <b-field grouped position="is-right">
                        <b-button @click="login()" id="submit-button" type="is-xanadu is-rounded">
                            <b>Submit</b>
                        </b-button>
                    </b-field>
                    <div id="error-message" v-if="isError !== ''">{{ isError }}</div>
                    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import {AUTH_REQUEST, AUTH_LOGOUT, AUTH_ERROR} from '@/store/actions/auth.ts';

export default {
    name: 'Login',
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
        };
    },
    created(this: any) {
        this.logout();
    },
    computed: {
        ...mapGetters(
            ['errors', 'status'],
        ),
        isError(this: { errors: string} ): string {
            return this.errors;
        },
        isLoading(this: { status: string } ): boolean {
            return this.status === 'Logging in';
        },
    },
    methods: {
        ...mapActions(
            [AUTH_REQUEST, AUTH_LOGOUT, AUTH_ERROR],
        ),
        logout(this: { AUTH_LOGOUT: any }) {
            this.AUTH_LOGOUT();
        },
        async login(this: { user: { email: string, password: string}, AUTH_REQUEST: any,
                    AUTH_ERROR: any, $router: any }) {
            const { user } = this;
            if (user.email && user.password) {
                await this.AUTH_REQUEST({user})
                    .then(() => this.$router.push({ name: 'Dashboard' }));
            } else {
                await this.AUTH_ERROR('Please provide your account credentials before submitting');
            }
        },
    },
};
</script>

<style lang="scss">
    .hero {
        background: $theme-xanadu;
    }

    .hero .title {
        margin: 5vh 25vw 5vh;
        color: $theme-isabelline;
    }

    .card {
        border-radius: 20px;
        background: $theme-xanadu;
        width: auto;
        margin: 5vh 25vw;
        padding: 1vh 1vh 1vh;
    }

    #layered-background {
        border-radius: 20px;
        background: $theme-ash-grey;
        padding: 5vh 5vw 5vh;
    }

    #error-message {
        color: #E83151;
    }

    .loading-background {
        border-radius: 20px;
    }
</style>
