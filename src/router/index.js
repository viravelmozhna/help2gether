import Vue from 'vue';
import VueRouter from 'vue-router';
// import HomeView from '../views/HomeView';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'start',
    redirect: '/demands/all',
  },
  {
    path: '/demands',
    name: 'demands',
    component: () => { return import(/* webpackChunkName: "demands" */ '../views/DemandsPage'); },
    children: [
      {
        path: 'all',
        name: 'all',
        component: () => { return import(/* webpackChunkName: "all" */ '../views/AllDemands'); },
      },
      {
        path: 'add',
        name: 'add',
        component: () => { return import(/* webpackChunkName: "add" */ '../views/AddDemand'); },
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: () => { return import(/* webpackChunkName: "add" */ '../views/UserPage'); },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => { return import(/* webpackChunkName: "profile" */ '../views/UserProfile'); },
      },
      {
        path: 'demands',
        component: () => { return import(/* webpackChunkName: "demands" */ '../views/UserDemands'); },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
