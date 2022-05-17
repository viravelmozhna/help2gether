import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    demands: [],
    demandInfo: [],
  },
  getters: {
  },
  mutations: {
    getDemandsList(state, payload) {
      state.demands = payload.data;
    },
    getDemandInfo(state, payload) {
      state.demandInfo = payload.data;
    },
  },
  actions: {
    getDemandsList(context, payload) {
      context.commit('getDemandsList', payload);
    },
    getDemandInfo(context, payload) {
      context.commit('getDemandInfo', payload);
    },
  },
  modules: {
  },
});
