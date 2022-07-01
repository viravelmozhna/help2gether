<template>
  <div>
    <NavBar />
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script>
import { getDatabase, ref, onValue } from 'firebase/database';
import NavBar from '@/components/common/NavBar.vue';

export default {
  name: 'DemandsPage',
  components: {
    NavBar,
  },
  created() {
    this.$store.dispatch('deleteAllFilters');

    const db = getDatabase();
    const demands = ref(db, 'demands');
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

      this.$store.dispatch('setDemands', {
        data: dataToArray,
      });
      this.$store.dispatch('setCities', {
        data: cities,
      });
    });
  },
};
</script>
