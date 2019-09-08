import MinimalLayout from '@/components/layouts/Minimal-Layout.vue';
import DashboardLayout from '@/components/layouts/Dashboard-Layout.vue';

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
        component: DashboardLayout,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('@/views/Dashboard.vue'),
            },
        ],
    },
    {
        path: '*',
        redirect: '/',
    },
];
