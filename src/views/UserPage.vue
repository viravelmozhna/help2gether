<template>
  <div>
    <NavBar />
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import { getDatabase, ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { auth } from '@/firebase';
import NavBar from '@/components/common/NavBar.vue';

export default {
  name: 'UserPage',
  components: {
    NavBar,
  },
  created() {
    this.$store.dispatch('deleteAllFilters');

    const db = getDatabase();
    const { currentUser } = auth;
    const demands = query(ref(db, 'demands'), orderByChild('assignedTo'), equalTo(currentUser.uid));
    onValue(demands, (snapshot) => {
      const dataToArray = Object.entries(snapshot.val());

      const cities = [];
      dataToArray.map((item) => {
        const city = item[1].contactData.address.city;
        if (cities.includes(city)) {
          return item;
        }
        cities.push(city);
        return item;
      });

      if (dataToArray) {
        this.$store.dispatch('setDemands', {
          data: dataToArray,
        });
        this.$store.dispatch('setCities', {
          data: cities,
        });
      } else {
        this.$store.dispatch('setDemands', {
          data: [],
        });
        this.$store.dispatch('setCities', {
          data: [],
        });
      };
    });
  },
};
</script>
