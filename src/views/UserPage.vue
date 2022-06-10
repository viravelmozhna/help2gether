<template>
  <div>
    <NavBar />
    <router-view/>
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
    const db = getDatabase();
    const { currentUser } = auth;
    const demands = query(ref(db, 'demands'), orderByChild('assignedTo'), equalTo(currentUser.uid));
    onValue(demands, (snapshot) => {
      const dataToArray = Object.entries(snapshot.val());
      this.$store.dispatch('setDemands', {
        data: dataToArray,
      });
    });
  },
};
</script>
