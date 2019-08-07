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
                        <b-input type="email" v-model="email" placeholder="Email input"/>
                    </b-field>
                    <b-field label="Password">
                        <b-input type="password" v-model="password" placeholder="Password"/>
                    </b-field>
                    <b-field grouped position="is-right">
                        <b-button @click="login()" id="submit-button" type="is-xanadu is-rounded">
                            <b>Submit</b>
                        </b-button>
                    </b-field>
                    <div id="error-message"></div>
                    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { AUTH_REQUEST, AUTH_LOGOUT } from '@/store/actions/auth.ts';
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            isLoading: false,
        };
    },
    created() {
        return this.$store.dispatch(AUTH_LOGOUT);
    },
    methods: {
        async login() {
            this.openLoading();
            const { email, password } = this;
            if (email && password) {
                this.hideErrorMessage();
                await this.$store
                    .dispatch(AUTH_REQUEST, { email, password })
                    .then(() => this.isLoading = false)
                    .then(() => this.$router.push({ name: 'Home' }));
            } else {
                this.injectErrorMessage('Please provide your account credentials before submitting');
                this.isLoading = false;
            }
        },
        openLoading() {
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
            }, 10000);
        },
        injectErrorMessage(message) {
            const errorMessage = document.getElementById('error-message');
            if (errorMessage != null) {
                errorMessage.innerText = message;
                errorMessage.style.display = 'block';
            }
        },
        hideErrorMessage() {
            const errorMessage = document.getElementById('error-message');
            if (errorMessage != null) {
                errorMessage.style.display = 'none';
            }
        },
    },
};
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
        background: $theme-ash-grey;
        padding: 5vh 5vw 5vh;
    }

    #error-message {
        display: none;
        color: #E83151;
    }

    .loading-background {
        border-radius: 20px;
    }
</style>
