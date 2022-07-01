import Vue from 'vue';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import '@/firebase';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.use(Toast);

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAxPjA1r401hT6qtHozJnIj0rnZKaNVRgQ',
    libraries: 'places',
    languages: 'en',
    region: 'us',
  },
  installComponents: true,
});

new Vue({
  store,
  router,
  render: (h) => { return h(App); },
}).$mount('#app');
