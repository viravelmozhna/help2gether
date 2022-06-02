<template>
<b-container fluid>
  <SearchInput />
  <SelectedFilters />

  <div class="d-flex flex-column flex-sm-row flex-nowrap">
    <b-list-group class="flex-column filters-list">

      <template v-for="(propertyOptions, propertyName) in filterProperties">
        <b-list-group-item class="p-2 pl-3 pr-3" :key="propertyName">
          <FilterComponent
            :filterName="propertyName"
            :filterOptions="propertyOptions"
          />
        </b-list-group-item>
      </template>

    </b-list-group>

    <b-container fluid>
      <b-row
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
import { filterPropertiesValues } from '@/env/constants';

export default {
  data() {
    return {
      filterProperties: filterPropertiesValues,
    };
  },
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
.demands-list {
  list-style: none;
}
@media screen and (min-width: 576px ) {
    .filters-list {
    width: 35vw;
    }
    .demands-list {
      justify-content: left !important;
      margin-top: -8px;
    }
}
@media screen and (min-width: 715px ) {
    .filters-list {
    width: 25vw;
    }
}
</style>
