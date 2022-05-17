<template>
  <b-container fluid>
    <b-row cols="1" cols-sm="3" cols-md="5" cols-lg="6" tag="ul" no-gutters class="p-0 mw-100" align-h="center">

      <!-- Structure of item ['demand-id', {demand-data}] -->
      <b-card
        v-for="item in items"
        :key="item[0]"
        align="left"
        tag="li"
        class="m-2 item"
        @click="() => {demandDetailedInfoPageOpenHandler(item[0])}"
      >
        <DemandItem :item="item[1]" />
      </b-card>

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
      this.$store.dispatch('getDemandsList', {
        data: dataToArray,
      });
    });
  },
  methods: {
    demandDetailedInfoPageOpenHandler(id) {
      this.$router.push({ path: `/demands/detailed/${id}` });
    },
  },
  components: {
    DemandItem,
  },
};
</script>

<style scoped>
.item:hover {
  transform: scale(1.02);
  border-color: #325892;
  cursor: pointer;
}
</style>
