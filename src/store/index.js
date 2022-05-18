import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    demands: [],
  },
  getters: {
  },
  mutations: {
    setDemands(state, payload) {
      state.demands = payload.data;
    },
  },
  actions: {
    setDemands(context, payload) {
      context.commit('setDemands', payload);
    },
  },
  modules: {
  },
});
