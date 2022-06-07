<template>
  <div class="d-flex flex-row pl-2 mb-2">
    <span class="font-weight-bold">Selected:</span>
    <span
      v-if="selectedFilters.length === 0"
      class="ml-2"
    >
      <i>No selected filters yet</i>
    </span>
    <ul class="active-filters-list d-flex flex-row flex-wrap pl-0 mb-0">
      <li
        v-for="filter in selectedFilters"
        :key="filter"
        class="ml-2 border rounded"
      >
        <b-badge variant="light">
          <button
            @click="deleteOneFilter(filter)"
            class="p-0 d-flex border-0 bg-transparent align-items-center"
          >
            <img src="@/assets/cross.png" width="10" height="10">
            <span class="text ml-2 text-uppercase">{{filter}}</span>
          </button>
        </b-badge>
      </li>
      <li>
        <button
          v-if="selectedFilters.length > 1"
          @click="deleteAllFilters()"
          class="ml-2 p-0 bg-transparent border-0"
        >
          <span class="border-bottom border-secondary">Reset all</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { filterProperties, filterPropertiesValues } from '@/env/constants';
export default {
  name: 'SelectedFilters',
  computed: {
    selectedFilters() {
      const activeFiltersListFromStore = Object.entries(this.$store.state.activeFiltersList);
      const selectedFilters = [];

      activeFiltersListFromStore.map((filter) => {
        if (filter[1].length > 0) {
          filter[1].map((property) => {
            selectedFilters.push(property);
            return property;
          });
        }
        return filter;
      });
      return selectedFilters;
    },
  },
  methods: {
    deleteOneFilter(filter) {
      let propertyName = filterProperties.REGION;
      if (filterPropertiesValues[filterProperties.STATUS].includes(filter)) {
        propertyName = filterProperties.STATUS;
      }
      if (filterPropertiesValues[filterProperties.EMERGENCY].includes(filter)) {
        propertyName = filterProperties.EMERGENCY;
      }
      if (filterPropertiesValues[filterProperties.CATEGORY].includes(filter)) {
        propertyName = filterProperties.CATEGORY;
      }

      this.$store.dispatch('deleteFilter', {
        propertyName: [propertyName],
        propertyValue: filter,
      });
    },
    deleteAllFilters() {
      this.$store.dispatch('deleteAllFilters');
    },
  },
};
</script>

<style scoped>
.text {
  font-weight: 500;
}
.active-filters-list {
  list-style: none;
}
</style>
