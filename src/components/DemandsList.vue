<template>
  <b-container fluid>
    <b-row cols="1" cols-sm="3" cols-md="5" cols-lg="6" tag="ul" no-gutters class="p-0 mw-100" align-h="center">

      <!-- Structure of item ['demand-id', {demand-data}] -->
      <template v-for="item in items">
        <DemandItem
          :status="item[1].status"
          :emergency="item[1].emergency"
          :category="item[1].category"
          :city="item[1].contactData.address.city"
          :demand="item[1].demand"
          :createdTime="item[1].time"
          :key="item[0]"
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
    items() {
      return this.$store.state.demands;
    },
  },
  mounted() {
    const db = getDatabase();
    const demands = ref(db, 'demands');
    onValue(demands, (snapshot) => {
      // Receive data from DB in objects, transforme it to array for easier maintenance and next interaction
      const dataToArray = Object.entries(snapshot.val());
      this.$store.dispatch('getData', {
        data: dataToArray,
      });
    });
  },
  components: {
    DemandItem,
  },
};
</script>
