<template>
  <b-container fluid>
    <b-row cols="1" cols-sm="3" cols-md="5" cols-lg="6" tag="ul" no-gutters class="p-0 mw-100" align-h="center">

      <!-- Structure of demand: ['demand-id', {demand-data}] -->
      <template v-for="demand in demands">
        <DemandItem
          :status="demand[1].status"
          :emergency="demand[1].emergency"
          :category="demand[1].category"
          :city="demand[1].contactData.address.city"
          :demand="demand[1].demand"
          :createdTime="demand[1].time"
          :id="demand[0]"
          :key="demand[0]"
        />
      </template>

    </b-row>
  </b-container>
</template>

<script>
import { getDatabase, ref, onValue } from 'firebase/database';
import DemandItem from './DemandItem.vue';

export default {
  computed: {
    demands() {
      console.log('5', this.$store.state.demands);
      return this.$store.state.demands;
    },
  },
  created() {
    console.log('0');
    const db = getDatabase();
    console.log('1');
    const demands = ref(db, 'demands');
    console.log('2');
    onValue(demands, (snapshot) => {
      // Receive data from DB in objects, transforme it to array for easier maintenance and next interaction
      const dataToArray = Object.entries(snapshot.val());
      console.log('3');
      this.$store.dispatch('setDemands', {
        data: dataToArray,
      });
      console.log('4');
    });
  },
  components: {
    DemandItem,
  },
};
</script>
