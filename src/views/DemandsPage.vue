<template>
  <div>
    <NavBar />
    <router-view/>
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
    const db = getDatabase();
    const demands = ref(db, 'demands');
    onValue(demands, (snapshot) => {
      const dataToArray = Object.entries(snapshot.val());
      this.$store.dispatch('setDemands', {
        data: dataToArray,
      });
    });
  },
};
</script>
