import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getDatabase, ref, onValue } from 'firebase/database';
// import { getDatabase, ref, set } from 'firebase/database';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
import router from './router';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyA7jP2FD-YA9RClr7yxoJngzVAO_WlA1Zk',
  authDomain: 'help2gether-a15a6.firebaseapp.com',
  databaseURL: 'https://help2gether-a15a6-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'help2gether-a15a6',
  storageBucket: 'help2gether-a15a6.appspot.com',
  messagingSenderId: '773867655973',
  appId: '1:773867655973:web:af94f40e3012c5af0e40cc',
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const db = getFirestore(app);
const id = 'id-1';

const db1 = getDatabase();
const starCountRef = ref(db1, 'demands/' + `${id}`);
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

// const writeUserData = function (userId, name) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + `${userId}`), {
//     name,
//   });
// };
// writeUserData(id, 'Olena');

new Vue({
  store,
  router,
  render: (h) => { return h(App); },
}).$mount('#app');
