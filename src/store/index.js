import Vue from 'vue';
import Vuex from 'vuex';
import filterDemands from '../utils/filterDemands';
import { filterProperties } from '@/env/constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLoggedIn: false,
      data: null,
    },
    demands: [],
    cities: [],
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
      city: [],
      status: [],
      emergency: [],
      category: [],
    },
  },
  getters: {
    isUserLoggedIn(state) {
      return state.user.isLoggedIn;
    },
    userData(state) {
      return state.user.data;
    },
    filteredDemands: (state) => {
      const { city, status, emergency, category } = state.activeFiltersList;

      const filteredByCategory = function (demands) {
        return filterDemands(demands, filterProperties.CATEGORY, category);
      };
      const filteredByStatus = function (demands) {
        return filterDemands(demands, filterProperties.STATUS, status);
      };
      const filteredByCity = function (demands) {
        return filterDemands(demands, filterProperties.CITY, city);
      };
      const filteredByEmergency = function (demands) {
        return filterDemands(demands, filterProperties.EMERGENCY, emergency);
      };

      return filteredByEmergency(filteredByCity(filteredByCategory(filteredByStatus(state.demands))));
    },
  },
  mutations: {
    setUserLoggedIn(state) {
      state.user.isLoggedIn = !state.user.isLoggedIn;
    },
    setUserData(state, payload) {
      state.user.data = payload;
    },
    setDemands(state, payload) {
      state.demands = payload.data;
    },
    setCities(state, payload) {
      state.cities = payload.data;
    },
    setDemandDetailedInfo(state, payload) {
      state.demandDetailedInfo = payload.data;
    },
    deleteFilter(state, payload) {
      const { propertyName, propertyValue } = payload;
      state.activeFiltersList = {
        ...state.activeFiltersList,
        [propertyName]: state.activeFiltersList[propertyName].filter((property) => {
          return property !== propertyValue;
        }),
      };
    },
    deleteAllFilters(state) {
      state.activeFiltersList = {
        city: [],
        status: [],
        emergency: [],
        category: [],
      };
    },
    addFilter(state, payload) {
      const { propertyName, propertyValue } = payload;
      if (state.activeFiltersList[propertyName].includes(propertyValue)) {
        return;
      }
      state.activeFiltersList = {
        ...state.activeFiltersList,
        [propertyName]: [...state.activeFiltersList[propertyName], propertyValue],
      };
    },
  },
  actions: {
    setUser(context, payload) {
      context.commit('setUserLoggedIn');
      context.commit('setUserData', payload);
    },
    setDemands(context, payload) {
      context.commit('setDemands', payload);
    },
    setCities(context, payload) {
      context.commit('setCities', payload);
    },
    setDemandDetailedInfo(context, payload) {
      context.commit('setDemandDetailedInfo', payload);
    },
    setActiveFiltersList(context, payload) {
      context.commit('setActiveFiltersList', payload);
    },
    deleteFilter(context, payload) {
      context.commit('deleteFilter', payload);
    },
    deleteAllFilters(context) {
      context.commit('deleteAllFilters');
    },
    addFilter(context, payload) {
      context.commit('addFilter', payload);
    },
  },
  modules: {
  },
});
