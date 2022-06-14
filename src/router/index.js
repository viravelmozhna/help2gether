import Vue from 'vue';
import VueRouter from 'vue-router';
import { getCurrentUser } from '@/firebase';

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
    component: () => { return import(/* webpackChunkName: "login" */ '@/views/LoginPage'); },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => { return import(/* webpackChunkName: "signup" */ '@/components/UserDataForm'); },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => { return import(/* webpackChunkName: "reset-password" */ '@/views/ResetPassword'); },
  },
  {
    path: '/demands',
    name: 'demands',
    component: () => { return import(/* webpackChunkName: "demands" */ '@/views/DemandsPage'); },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => { return import(/* webpackChunkName: "list" */ '@/components/demands/DemandsList'); },
      },
      {
        path: 'add',
        name: 'demand-new',
        component: () => { return import(/* webpackChunkName: "demand-new" */ '@/components/demands/DemandNew'); },
      },
      {
        path: 'detailed/:id',
        name: 'demand-detailed',
        component: () => { return import(/* webpackChunkName: "demand-detailed" */ '@/components/demands/DemandDetailed'); },
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: () => { return import(/* webpackChunkName: "user" */ '@/views/UserPage'); },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'profile/:id',
        name: 'user-profile',
        component: () => { return import(/* webpackChunkName: "user-profile" */ '@/components/UserProfile'); },
      },
      {
        path: 'edit',
        name: 'edit-user-profile',
        component: () => { return import(/* webpackChunkName: "edit-user-profile" */ '@/components/UserDataForm'); },
      },
      {
        path: 'demands',
        name: 'user-demands',
        component: () => { return import(/* webpackChunkName: "user-demands" */ '@/components/demands/DemandsList'); },
      },
    ],
  },
  {
    path: '*',
    name: 'page-not-found',
    component: () => { return import(/* webpackChunkName: "page-not-found" */ '@/views/PageNotFound'); },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => {
    return record.meta.requiresAuth;
  });
  if (requiresAuth && !await getCurrentUser()) {
    next({
      path: '/login',
    });
  } else {
    next();
  }
});

export default router;
