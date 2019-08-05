import App from './App.vue';
import Buefy from 'buefy';
import router from '@/router/router';
import store from '@/store';
import Vue from 'vue';

import 'buefy/dist/buefy.css';
import '@/registerServiceWorker';
import '@/services';

Vue.use(Buefy);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
