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
    getDemandsList(state, payload) {
      state.demands = payload.data;
    },
  },
  actions: {
    getDemandsList(context, payload) {
      context.commit('getDemandsList', payload);
    },
  },
  modules: {
  },
});
