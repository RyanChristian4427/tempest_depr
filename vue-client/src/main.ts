import App from './App.vue';
import Buefy from 'buefy';
import { router } from '@/router/router';
import store from '@/store';
import Vue from 'vue';

import '@/services';
import '@/registerServiceWorker';

Vue.use(Buefy);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
