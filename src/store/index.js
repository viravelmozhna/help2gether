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
    getData(state, payload) {
      state.demands = payload.data;
    },
  },
  actions: {
    getData(context, payload) {
      context.commit('getData', payload);
    },
  },
  modules: {
  },
});
