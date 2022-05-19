import Vue from 'vue';
import Vuex from 'vuex';
// import { getDatabase, ref, onValue } from 'firebase/database';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
  },
  getters: {
  },
  mutations: {
    setDemands(state, payload) {
      state.demands = payload.data;
    },
    setDemandDetailedInfo(state, payload) {
      state.demandDetailedInfo = payload.data;
    },
  },
  actions: {
    setDemands(context, payload) {
      context.commit('setDemands', payload);
    },
    setDemandDetailedInfo(context, payload) {
      context.commit('setDemandDetailedInfo', payload);
    },
    // setDemandDetailedInfo(context, { id }) {
    //   console.log('1 - setDemandDetailedInfo action begins');
    //   const db = getDatabase();
    //   console.log('2 - get db');
    //   const demandInfo = ref(db, 'demands/' + id);
    //   console.log('3 - get demand info ref');
    //   onValue(demandInfo, (snapshot) => {
    //     const data = snapshot.val();
    //     console.log('4 - onvalue snapshot');
    //     context.commit('setDemandDetailedInfo', {
    //       data,
    //     });
    //     console.log('5 - add info to store');
    //   });
    // },
  },
  modules: {
  },
});
