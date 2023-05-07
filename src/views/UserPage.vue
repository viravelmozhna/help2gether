<template>
  <div>
    <NavBar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';
import { auth } from '@/firebase';
import NavBar from '@/components/common/NavBar.vue';

export default {
  name: 'UserPage',
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
    const { currentUser } = auth;
    const sourceDemands = query(
      ref(db, 'demands'),
      orderByChild('assignedTo'),
      equalTo(currentUser.uid),
    );

    this.unsubscribe = onValue(sourceDemands, (snapshot) => {
      const dataSnapshot = snapshot.val();

      if (dataSnapshot) {
        this.demands = Object.entries(dataSnapshot);

        this.demands.map((item) => {
          const city = item[1].contactData.address.city;
          if (!this.cities.includes(city)) {
            this.cities.push(city);
          }
          return item;
        });
      }

      this.$store.dispatch('setDemands', {
        data: this.demands,
      });
      this.$store.dispatch('setCities', {
        data: this.demands,
      });
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};
</script>
