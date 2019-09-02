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
                        <b-button @click="login" id="submit-button" type="is-xanadu is-rounded">
                            <b>Submit</b>
                        </b-button>
                    </b-field>
                    <div id="error-message" v-if="errors">{{ errors }}</div>
                    <b-loading :is-full-page="false" :active.sync="loadingStatus" :can-cancel="false"></b-loading>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import { Action, Getter } from 'vuex-class';
    import {AUTH_REQUEST, AUTH_LOGOUT, AUTH_ERROR} from '@/store/actions/auth.ts';

    interface IUser {
        email: string;
        password: string;
    }

    @Component
    export default class Login extends Vue {
        public user: IUser = {
            email: '',
            password: '',
        };

        @Getter('errors') public errors!: string;
        @Getter('status') private status!: string;
        @Action(AUTH_REQUEST) private AUTH_REQUEST: any;
        @Action(AUTH_LOGOUT) private AUTH_LOGOUT: any;
        @Action(AUTH_ERROR) private AUTH_ERROR: any;

        // Computed
        get loadingStatus() {
            return this.status === 'Authenticating';
        }

        // Methods
        public async login() {
            const { user } = this;
            if (user.email && user.password) {
                await this.AUTH_REQUEST({user})
                    .then(() => this.$router.push({ name: 'Dashboard' }));
            } else {
                this.AUTH_ERROR('Please provide your account credentials before submitting');
            }
        }

        protected logout() {
            this.AUTH_LOGOUT();
        }

        private created() {
            this.logout();
        }
    }
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
