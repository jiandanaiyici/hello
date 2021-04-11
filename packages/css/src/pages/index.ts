import App from '../views/App.vue';
import router from '../router';

import '../assets/vue.less';

import Vue from 'vue';
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
