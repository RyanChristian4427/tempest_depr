import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: () => import('components/layouts/Minimal.vue'),
        children: [
            {
                path: 'login',
                name: 'Login',
                component: () => import('routes/authentication/Login.vue'),
            },
            {
                path: 'register',
                name: 'Register',
                component: () => import('routes/authentication/Register.vue'),
            },
        ],
    },
    {
        path: '*',
        redirect: '404',
    },
];

export const router = new VueRouter({
    mode: 'history',
    routes,
});
