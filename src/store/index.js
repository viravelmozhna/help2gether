import Vue from 'vue';
import Vuex from 'vuex';
import requestsList from '../assets/requestsList';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    requests: requestsList,
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
