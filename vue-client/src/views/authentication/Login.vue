<template>
    <div>
        <section class="hero is-medium is-bold">
            <div class="hero-body">
                <h1 class="title">
                    Login
                </h1>
            </div>
        </section>
        <section>
            <form class="card" id="logon-form">
                <section id="layered-background">
                    <div class="field">
                        <label for="email" class="label">Email</label>
                        <div class="control has-icons-left has-icons-right">
                            <input type="email" id="email" v-model="email" placeholder="Email input">
                        </div>
                    </div>
                    <div class="field">
                        <label for="password" class="label">Password</label>
                        <div class="control has-icons-left has-icons-right">
                            <input type="password" id="password" v-model="password" placeholder="Password">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <a @click="login()" class="button is-xanadu is-rounded"><b>Submit</b></a>
                        </div>
                    </div>
                </section>
            </form>
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
        };
    },
    created() {
        return this.$store.dispatch(AUTH_LOGOUT);
    },
    methods: {
        async login() {
            const { email, password } = this;
            if (email && password) {
                await this.$store.dispatch(AUTH_REQUEST, { email, password });
                this.$router.push({ name: 'Home' });
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
        height: 33vh;
    }

    .hero .title {
        margin-left:25vw;
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
</style>
