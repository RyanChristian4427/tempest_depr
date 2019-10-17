<template>
    <div>
        <section class="hero is-small is-bold">
            <div class="hero-body">
                <h1 class="title">Register</h1>
            </div>
        </section>
        <section>
            <div class="card">
                <div class="container" id="layered-background">
                    <b-field label="First Name">
                        <b-input type="text" v-model="user.first_name" placeholder="John"/>
                    </b-field>
                    <b-field label="Last Name">
                        <b-input type="text" v-model="user.last_name" placeholder="Smith"/>
                    </b-field>
                    <b-field label="Email">
                        <b-input type="email" v-model="user.email" placeholder="jsmith@example.com"/>
                    </b-field>
                    <b-field label="Password">
                        <b-input type="password" v-model="user.password" placeholder="******"/>
                    </b-field>
                    <div class="level">
                        <div class="level-left">
                            <b-button @click="navigateToLogin" class="level-item" id="login-nav-button" type="is-xanadu is-rounded">
                                <b>Or login Instead</b>
                            </b-button>
                        </div>
                        <div class="level-right">
                            <b-button @click="register" class="level-item" id="submit-button" type="is-xanadu is-rounded">
                                <b>Register</b>
                            </b-button>
                        </div>
                    </div>
                    <div id="error-message" v-if="errors">{{ errors }}</div>
                    <b-loading :is-full-page="false" :active.sync="loadingStatus" :can-cancel="false"></b-loading>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import { Action, Getter } from 'vuex-class';
    import { AUTH_REGISTER, AUTH_LOGOUT, AUTH_ERROR } from '@/store/actions/auth.ts';

    interface IUser {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
    }

    @Component
    export default class Register extends Vue {
        public user: IUser = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        };

        @Getter('errors') public errors!: string;
        @Getter('status') private status!: string;
        @Action(AUTH_REGISTER) private AUTH_REGISTER: any;
        @Action(AUTH_LOGOUT) private AUTH_LOGOUT: any;
        @Action(AUTH_ERROR) private AUTH_ERROR: any;

        // Computed
        get loadingStatus() {
            return this.status === 'Authenticating';
        }

        // Methods
        public async register() {
            const { user } = this;
            if (user.first_name && user.last_name && user.email && user.password) {
                await this.AUTH_REGISTER({user})
                    .then(() => this.$router.push({ name: 'Dashboard' }));
            } else {
                this.AUTH_ERROR('Please provide your new account credentials before submitting');
            }
        }

        protected navigateToLogin() {
            this.$router.push({ name: 'Login' });
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
    html {
        overflow-y: hidden;
    }

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
        background: $theme-charleston-green;
        padding: 5vh 5vw 5vh;
    }

    #error-message {
        color: #E83151;
    }

    .loading-background {
        border-radius: 20px;
    }
</style>
