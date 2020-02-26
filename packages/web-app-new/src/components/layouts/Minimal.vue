<template>
    <div class="auth-page">
        <section class="hero is-fullheight">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-4 is-offset-4">
                        <h3 class="title">
                            {{ state.login ? 'Login' : state.register ? 'Register' : 'Forgotten Password' }}
                        </h3>
                        <hr class="auth-hr" />
                        <h5 class="subtitle">
                            {{
                                state.login
                                    ? 'Please provide your credentials to proceed'
                                    : state.register
                                    ? 'Please provide your details to proceed'
                                    : 'Please do something to proceed'
                            }}
                        </h5>
                        <div class="box">
                            <figure class="avatar">
                                <img src="https://picsum.photos/800/600/?random" alt="he-man" />
                            </figure>
                            <router-view />
                        </div>
                        <p class="has-text-grey" v-if="state.login">
                            <RouterLink to="/register">Sign Up</RouterLink>
                            &nbsp;·&nbsp;
                            <RouterLink to="/">Forgot Password</RouterLink>
                        </p>
                        <p class="has-text-grey" v-else-if="state.register">
                            <RouterLink to="/login">Login</RouterLink>
                            &nbsp;·&nbsp;
                            <RouterLink to="/">Forgot Password</RouterLink>
                        </p>
                        <p class="has-text-grey" v-else-if="state.forgottenPassword">
                            <RouterLink to="/login">Login</RouterLink>
                            &nbsp;·&nbsp;
                            <RouterLink to="/register">Sign Up</RouterLink>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@vue/composition-api';
import Footer from 'components/core/Footer.vue';

interface IState {
    login: boolean;
    register: boolean;
    forgottenPassword: boolean;
}

export default defineComponent({
    components: { Footer },
    setup(props, { root }) {
        const state: IState = reactive<IState>({
            login: false,
            register: false,
            forgottenPassword: false,
        });

        watch(() => {
            root.$route.path === '/login'
                ? (state.login = true, state.register = false, state.forgottenPassword = false)
                : root.$route.path === '/register'
                    ? (state.login = false, state.register = true, state.forgottenPassword = false)
                    : (state.login = false, state.register = false, state.forgottenPassword = true);
        });
        return {
            state,
        };
    },
});
</script>

<style lang="scss">
.hero {
    background: #f2f6fa;

    .nav {
        -webkit-box-shadow: none;
        box-shadow: none;
    }
}
.box {
    margin-top: 5rem;
}
.avatar {
    margin-top: -70px;
    padding-bottom: 20px;

    img {
        height: 128px;
        width: 128px;
        padding: 5px;
        background: #fff;
        border-radius: 50%;
        -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    }
}
input {
    font-weight: 300;
}
p {
    font-weight: 700;

    .subtitle {
        padding-top: 1rem;
    }
}

.auth-hr {
    border-bottom: 1px solid black;
}

.field {
    padding-bottom: 10px;
}

.icon {
    margin-left: 5px;
}

.error {
    color: crimson;
    text-align: center;
}
</style>
