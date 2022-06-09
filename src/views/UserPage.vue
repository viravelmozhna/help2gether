<template>
  <div>
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import { getDatabase, ref, onValue, startAt, query, orderByChild } from 'firebase/database';
import { auth } from '@/firebase';
import NavBar from '@/components/common/NavBar.vue';

export default {
  name: 'UserPage',
  components: {
    NavBar,
  },
  created() {
    const db = getDatabase();
    const { currentUser } = auth;
    const demands = query(ref(db, 'demands'), orderByChild('assignedTo'), startAt(currentUser.uid));
    onValue(demands, (snapshot) => {
      // Receive data from DB in objects, transforme it to array for easier maintenance and next interaction
      const dataToArray = Object.entries(snapshot.val());
      this.$store.dispatch('setDemands', {
        data: dataToArray,
      });
    });
  },
};
</script>
