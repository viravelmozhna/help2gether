import Vue from 'vue';
import Vuex from 'vuex';
import demandsListMockupData from '../assets/demandsListMockupData';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    demands: demandsListMockupData,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
