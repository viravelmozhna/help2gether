import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // by default we return to the full list of demands; in the future 'user-demands' component we will change this 'goBackToUrl' path with action
    goBackToUrl: '/demands/list',
    demands: [],
    demandDetailedInfo: {
      contactData: {
        name: '',
        phone: '',
        address: {
          region: '',
        },
      },
      demand: '',
      category: '',
      createdTime: '',
      status: '',
      emergency: '',
    },
    activeFiltersList: {
      status: 'active',
    },
  },
  getters: {
  },
  mutations: {
    setDemands(state, payload) {
      state.demands = payload.data;
    },
    setDemandDetailedInfo(state, payload) {
      state.demandDetailedInfo = payload.data;
    },
    setGoBackToUrl(state, payload) {
      state.path = payload.path;
    },
    setActiveFiltersList(state, payload) {
      state.activeFiltersList = {
        ...state.activeFiltersList,
        region: payload.region,
      };
    },
  },
  actions: {
    setDemands(context, payload) {
      context.commit('setDemands', payload);
    },
    setDemandDetailedInfo(context, payload) {
      context.commit('setDemandDetailedInfo', payload);
    },
    setGoBackToUrl(context, payload) {
      context.commit('setGoBackToUrl', payload);
    },
    setActiveFiltersList(context, payload) {
      context.commit('setActiveFiltersList', payload);
    },
  },
  modules: {
  },
});
