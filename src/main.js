import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import '@/firebase';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from '@/store';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   const { currentUser } = auth;
//   console.log('1 currentUser name', currentUser.displayName);
//   console.log('1 currentUser email', currentUser.email);
//   // store.dispatch('setUser', currentUser);
// });

new Vue({
  store,
  router,
  render: (h) => { return h(App); },
}).$mount('#app');
