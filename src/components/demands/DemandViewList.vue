<template>
  <b-container fluid>
    <span v-if="demands.length === 0">The list is empty...</span>

    <b-row
      v-else
      cols="1"
      cols-sm="3"
      cols-md="4"
      cols-lg="5"
      cols-xl="6"
      tag="ul"
      no-gutters
      class="p-0 mw-100 demands-list"
      align-h="center"
    >
      <!-- Structure of demand: ['demand-id', {demand-data}] -->
      <DemandItem
        v-for="demand in demands"
        :status="demand[1].status"
        :emergency="demand[1].emergency"
        :category="demand[1].category"
        :demand="demand[1].demand"
        :createdTime="demand[1].createdTime"
        :city="demand[1].contactData.address.city || 'No city'"
        :hasLocation="hasDemandLocation(demand)"
        :id="demand[0]"
        :key="demand[0]"
      />
    </b-row>
  </b-container>
</template>

<script>
import hasValidCoords from '@/utils/hasValidCoords';
import DemandItem from './DemandItem.vue';

export default {
  name: 'DemandViewList',
  components: {
    DemandItem,
  },
  computed: {
    demands() {
      return this.$store.getters.filteredDemands;
    },
  },
  methods: {
    hasDemandLocation(demand) {
      const address = demand[1] && demand[1].contactData && demand[1].contactData.address;
      return hasValidCoords(address && address.coords);
    },
  },
};
</script>

<style scoped>
.demands-list {
  list-style: none;
}
@media screen and (min-width: 576px) {
  .demands-list {
    justify-content: left !important;
    margin-top: -8px;
  }
}
</style>
