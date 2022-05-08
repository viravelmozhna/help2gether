import Vue from 'vue';
import VueRouter from 'vue-router';
import StartView from '../views/StartView';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'start',
    component: StartView,
  },
  // When authentication will be implemented path "/home" and its chidren will be accessible only after sign in/log in
  {
    path: '/home',
    name: 'home',
    component: () => { return import(/* webpackChunkName: "home" */ '../views/HomeView.vue'); },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => { return import(/* webpackChunkName: "profile" */ '../views/ProfileView'); },
      },
      {
        path: 'all-requests',
        name: 'all-requests',
        component: () => { return import(/* webpackChunkName: "all-requests" */ '../views/AllRequestsView'); },
      },
      {
        path: 'your-requests',
        name: 'your-requests',
        component: () => { return import(/* webpackChunkName: "your-requests" */ '../views/YourRequestsView'); },
      },
      {
        path: 'add-request',
        name: 'add-request',
        component: () => { return import(/* webpackChunkName: "add-request" */ '../views/AddRequestView'); },
      },
    ],
  },
  {
    path: '*',
    name: 'page-not-found',
    component: () => { return import(/* webpackChunkName: "page-not-found" */ '../components/PageNotFound.vue'); },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
