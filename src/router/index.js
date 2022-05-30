import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'start',
    redirect: '/demands/list',
  },
  {
    path: '/login',
    name: 'login',
    component: () => { return import(/* webpackChunkName: "login" */ '../views/LoginPage'); },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => { return import(/* webpackChunkName: "signup" */ '../views/SignupPage'); },
  },
  {
    path: '/demands',
    name: 'demands',
    component: () => { return import(/* webpackChunkName: "demands" */ '../views/DemandsPage'); },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => { return import(/* webpackChunkName: "list" */ '../components/DemandsList'); },
      },
      {
        path: 'add',
        name: 'add',
        component: () => { return import(/* webpackChunkName: "add" */ '../views/AddDemand'); },
      },
      {
        path: 'detailed/:id',
        name: 'demand-detailed-info-page',
        component: () => { return import(/* webpackChunkName: "demand-detailed-info-page" */ '../components/DemandDetailedInfoPage'); },
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
        name: 'user-demands',
        component: () => { return import(/* webpackChunkName: "user-demands" */ '../views/UserDemands'); },
      },
    ],
  },
  {
    path: '*',
    name: 'page-not-found',
    component: () => { return import(/* webpackChunkName: "page-not-found" */ '../components/PageNotFound'); },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
