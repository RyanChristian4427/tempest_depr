import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

// Create a new router
export const router = new Router({
    mode: 'history',
    routes,
});

const DEFAULT_TITLE = 'Tempest';
router.afterEach((to, from) => {
    document.title = to.name + ' - Tempest' || DEFAULT_TITLE;
});

