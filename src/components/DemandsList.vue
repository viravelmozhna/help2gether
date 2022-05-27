<template>
<b-container fluid>
  <SearchInput />
  <SelectedFilters />

  <div class="d-flex flex-column flex-sm-row flex-nowrap">
    <b-list-group class="flex-column filters-list">
      <b-list-group-item class="p-2 pl-3 pr-3"><FilterComponent filterName="emergency" :options="['urgent', 'non-urgent']" key="emergency"/></b-list-group-item>
      <b-list-group-item class="p-2 pl-3 pr-3"><FilterComponent filterName="status" :options="['active', 'in progress', 'completed']" key="status"/></b-list-group-item>
      <b-list-group-item class="p-2 pl-3 pr-3"><FilterComponent filterName="category" :options="['food', 'clothes', 'medicines', 'other']" key="category"/></b-list-group-item>
    </b-list-group>

    <b-container fluid>
      <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="5" tag="ul" no-gutters class="p-0 mw-100" align-h="center">

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
  </div>
</b-container>
</template>

<script>
import { getDatabase, ref, onValue } from 'firebase/database';
import DemandItem from './DemandItem.vue';
import SearchInput from './SearchInput.vue';
import SelectedFilters from './SelectedFilters.vue';
import FilterComponent from './FilterComponent.vue';

export default {
  computed: {
    demands() {
      return this.$store.getters.filteredDemands;
    },
  },
  created() {
    const db = getDatabase();
    const demands = ref(db, 'demands');
    onValue(demands, (snapshot) => {
      // Receive data from DB in objects, transforme it to array for easier maintenance and next interaction
      const dataToArray = Object.entries(snapshot.val());
      this.$store.dispatch('setDemands', {
        data: dataToArray,
      });
    });
  },
  components: {
    DemandItem,
    SearchInput,
    SelectedFilters,
    FilterComponent,
  },
};
</script>

<style scoped>
@media screen and (min-width: 576px ) {
    .filters-list {
    width: 35vw;
    }
}
@media screen and (min-width: 715px ) {
    .filters-list {
    width: 25vw;
    }
}
</style>
