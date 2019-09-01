import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from '@/store';

Vue.use(Router);

// Create a new router
export const router = new Router({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const authenticated = store.getters.isAuthenticated;

    return (authRequired && !authenticated) ? next('/login') : next();
});

const DEFAULT_TITLE = 'Tempest';
router.afterEach((to, from) => {
    document.title = to.name + ' - Tempest' || DEFAULT_TITLE;
});

