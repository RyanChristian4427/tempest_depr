import App from './App.vue';
import Buefy from 'buefy';
import { router } from '@/router/router';
import store from '@/store';
import Vue from 'vue';

import '@/services';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Buefy, {
  defaultIconPack: 'mdi',
});


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
