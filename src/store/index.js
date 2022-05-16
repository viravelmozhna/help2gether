import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    demands: {},
  },
  getters: {
  },
  mutations: {
    getData(state, data) {
      state.demands = data;
    },
  },
  actions: {
  },
  modules: {
  },
});
