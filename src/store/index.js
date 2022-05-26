import Vue from 'vue';
import Vuex from 'vuex';
import filterDemands from '../utils/filterDemands';
import constants from '../env/constants';

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
      region: '',
      status: 'active',
      emergency: 'urgent',
      category: '',
    },
  },
  getters: {
    filteredDemands: (state) => {
      const { region, status, emergency, category } = state.activeFiltersList;

      const filteredByCategory = function (demands) {
        return filterDemands(demands, constants.CATEGORY, category);
      };
      const filteredByStatus = function (demands) {
        return filterDemands(demands, constants.STATUS, status);
      };
      const filteredByRegion = function (demands) {
        return filterDemands(demands, constants.REGION, region);
      };
      const filteredByEmergency = function (demands) {
        return filterDemands(demands, constants.EMERGENCY, emergency);
      };

      return filteredByEmergency(filteredByRegion(filteredByCategory(filteredByStatus(state.demands))));
    },
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
        ...payload,
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
