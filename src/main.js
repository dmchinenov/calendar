import Vue from 'vue';
import moment from 'moment';
import App from './App.vue';
import store from './store';

Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
