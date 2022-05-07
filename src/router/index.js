import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => { return import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue'); },
  },
  {
    path: '/all-requests',
    name: 'all-requests',
    component: () => { return import(/* webpackChunkName: "all-requests" */ '../views/AllRequestsView.vue'); },
  },
  {
    path: '/your-requests',
    name: 'your-requests',
    component: () => { return import(/* webpackChunkName: "your-requests" */ '../views/YourRequestsView.vue'); },
  },
  {
    path: '/add-request',
    name: 'add-request',
    component: () => { return import(/* webpackChunkName: "add-request" */ '../views/AddRequestView.vue'); },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
