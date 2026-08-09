import Vue from 'vue';
import VueRouter from 'vue-router';
import { getCurrentUser } from '@/firebase';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'start',
    redirect: '/demands/list/list-view',
  },
  {
    path: '/login',
    name: 'login',
    component: () => {
      return import(/* webpackChunkName: "login" */ '@/views/LoginPage');
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => {
      return import(
        /* webpackChunkName: "signup" */ '@/components/user/UserFormView'
      );
    },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => {
      return import(
        /* webpackChunkName: "reset-password" */ '@/views/ResetPassword'
      );
    },
  },
  {
    path: '/demands',
    name: 'demands',
    component: () => {
      return import(/* webpackChunkName: "demands" */ '@/views/DemandsPage');
    },
    redirect: '/demands/list/list-view',
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => {
          return import(
            /* webpackChunkName: "list" */ '@/components/demands/DemandsList'
          );
        },
        redirect: '/demands/list/list-view',
        children: [
          {
            path: 'list-view',
            name: 'list-view',
            component: () => {
              return import(
                /* webpackChunkName: "list-view" */ '@/components/demands/DemandViewList'
              );
            },
          },
          {
            path: 'map-view',
            name: 'map-view',
            component: () => {
              return import(
                /* webpackChunkName: "map-view" */ '@/components/demands/DemandViewMap'
              );
            },
          },
        ],
      },
      {
        path: 'add',
        name: 'demand-new',
        meta: { requiresAuth: true },
        component: () => {
          return import(
            /* webpackChunkName: "demand-new" */ '@/components/demands/DemandFormView'
          );
        },
      },
      {
        path: 'detailed/:id',
        name: 'demand-detailed',
        component: () => {
          return import(
            /* webpackChunkName: "demand-detailed" */ '@/components/demands/DemandDetailed'
          );
        },
      },
      {
        path: 'edit/:id',
        name: 'demand-edit',
        meta: { requiresAuth: true },
        component: () => {
          return import(
            /* webpackChunkName: "demand-edit" */ '@/components/demands/DemandFormView'
          );
        },
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    component: () => {
      return import(/* webpackChunkName: "user" */ '@/views/UserPage');
    },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'profile/:id',
        name: 'user-profile',
        component: () => {
          return import(
            /* webpackChunkName: "user-profile" */ '@/components/user/UserProfile'
          );
        },
      },
      {
        path: 'edit',
        name: 'edit-user-profile',
        component: () => {
          return import(
            /* webpackChunkName: "edit-user-profile" */ '@/components/user/UserFormView'
          );
        },
      },
      {
        path: 'demands',
        name: 'user-demands',
        component: () => {
          return import(
            /* webpackChunkName: "user-demands" */ '@/components/demands/DemandsList'
          );
        },
        redirect: '/user/demands/list-view',
        children: [
          {
            path: 'list-view',
            name: 'user-list-view',
            component: () => {
              return import(
                /* webpackChunkName: "user-list-view" */ '@/components/demands/DemandViewList'
              );
            },
          },
          {
            path: 'map-view',
            name: 'user-map-view',
            component: () => {
              return import(
                /* webpackChunkName: "user-map-view" */ '@/components/demands/DemandViewMap'
              );
            },
          },
        ],
      },
    ],
  },
  {
    path: '*',
    name: 'page-not-found',
    component: () => {
      return import(
        /* webpackChunkName: "page-not-found" */ '@/views/PageNotFound'
      );
    },
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
  if (requiresAuth && !(await getCurrentUser())) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
