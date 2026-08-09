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
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
} from 'vue2-leaflet';

// Fix default Leaflet marker icons broken by Webpack asset handling
/* eslint-disable no-underscore-dangle */
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
/* eslint-enable no-underscore-dangle */

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.use(Toast);

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => {
    return h(App);
  },
}).$mount('#app');
