import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './vuetify';
import ConfirmItemModal from '@/components/ConfirmItemModal';


Vue.config.productionTip = false;
Vue.component('ConfirmItemModal', ConfirmItemModal);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
