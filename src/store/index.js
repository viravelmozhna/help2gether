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
    setDemands(state, payload) {
      state.demands = payload.data;
    },
    getDemandInfo(state, payload) {
      state.demandInfo = payload.data;
    },
  },
  actions: {
    setDemands(context, payload) {
      context.commit('setDemands', payload);
    },
    getDemandInfo(context, payload) {
      context.commit('getDemandInfo', payload);
    },
  },
  modules: {
  },
});
