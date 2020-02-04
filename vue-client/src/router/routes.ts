import MinimalLayout from '@/components/layouts/MinimalLayout.vue';
import InboxLayout from '@/components/layouts/InboxLayout.vue';

export default [
    {
        path: '/',
        component: MinimalLayout,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: () => import('@/views/authentication/Login.vue'),
            },
            {
                path: '/register',
                name: 'Register',
                component: () => import('@/views/authentication/Register.vue'),
            },
        ],
    },
    {
        path: '/',
        component: InboxLayout,
        children: [
            {
                path: '/inbox',
                name: 'Inbox',
                component: () => import('@/views/Inbox.vue'),
            },
        ],
    },
    {
        path: '*',
        redirect: '/',
    },
];
