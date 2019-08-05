export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: 'Home - Tempest',
        },
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
        meta: {
            title: 'About - Tempest',
        },
    },
    {
        path: '*',
        redirect: '/',
    },
];
