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
        if (status) {
          const filteredListOfDemands = demands.filter((demand) => {
            return demand[1].status === status;
          });
          return filteredListOfDemands;
        };
        return demands;
      };

      const filteredByStatus = function (demands) {
        if (category) {
          const filteredListOfDemands = demands.filter((demand) => {
            return demand[1].category === category;
          });
          return filteredListOfDemands;
        };
        return demands;
      };

      const filteredByRegion = function (demands) {
        if (region) {
          const filteredListOfDemands = demands.filter((demand) => {
            return demand[1].contactData.address.region.toLowerCase() === region.toLowerCase();
          });
          return filteredListOfDemands;
        };
        return demands;
      };

      const filteredByEmergency = function (demands) {
        if (emergency) {
          const filteredListOfDemands = demands.filter((demand) => {
            return demand[1].emergency === emergency && demand[1].status === 'active';
          });
          return filteredListOfDemands;
        };
        return demands;
      };

      const filteredListOfDemands = filteredByEmergency(filteredByRegion(filteredByCategory(filteredByStatus(state.demands))));
      return filteredListOfDemands;
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
