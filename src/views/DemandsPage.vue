<template>
  <div>
    <NavBar />
    <router-view :key="$route.fullPath" />
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
  data() {
    return {
      unsubscribe: null,
      demands: [],
      cities: [],
    };
  },
  created() {
    this.$store.dispatch('deleteAllFilters');

    const db = getDatabase();
    const sourceDemands = ref(db, 'demands');
    this.unsubscribe = onValue(sourceDemands, (snapshot) => {
      const dataSnapshot = snapshot.val();

      if (dataSnapshot) {
        this.demands = Object.entries(dataSnapshot);

        this.demands.map((item) => {
          const city = item[1].contactData.address.city;
          if (this.cities.includes(city)) {
            return item;
          }
          this.cities.push(city);
          return item;
        });
      }

      this.$store.dispatch('setDemands', {
        data: this.demands,
      });
      this.$store.dispatch('setCities', {
        data: this.cities,
      });
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};
</script>
