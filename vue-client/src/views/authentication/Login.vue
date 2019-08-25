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
                    <div id="error-message" v-if="error">{{ error }}</div>
                    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { AUTH_REQUEST, AUTH_LOGOUT } from '@/store/actions/auth.ts';
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
    created() {
        return this.$store.dispatch(AUTH_LOGOUT);
    },
    computed: {
        ...mapState({
            error: (state) => state.auth.errors,
        }),
        ...mapGetters(
            ['status'],
        ),
        isLoading: function() {
            return this.status === 'Logging in';
        }
    },
    methods: {
        async login() {
            const { user } = this;
            if (user.email && user.password) {
                this.injectErrorMessage('');
                await this.$store.dispatch(AUTH_REQUEST, { user })
                    .then(() => this.$router.push({ name: 'Dashboard' }));
            } else {
                this.injectErrorMessage('Please provide your account credentials before submitting');
            }
        },
        injectErrorMessage(message) {
            this.$store.state.auth.errors = message;
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
        color: #E83151;
    }

    .loading-background {
        border-radius: 20px;
    }
</style>
