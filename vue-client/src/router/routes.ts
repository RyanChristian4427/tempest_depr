import Minimal from '@/components/layouts/Minimal.vue';

export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
    },
    {
        path: '/',
        component: Minimal,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: () => import('@/views/authentication/Login.vue'),
            },
        ],
    },
    {
        path: '*',
        redirect: '/',
    },
];
