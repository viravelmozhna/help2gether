<template>
<b-container fluid>

  <div class="controls-wrapper d-flex flex-column">
    <!-- TODO: implement search by city -->
    <SearchInput />

    <div class="style-wrapper">
      <SelectedFilters />

      <div class="view-links">
        <b-link
          to="list-view"
          class="link mr-3"
          exact-active-class="active"
        >List view</b-link>

        <b-link
          to="map-view"
          class="link"
          exact-active-class="active"
        >Map view</b-link>
      </div>
    </div>
  </div>

  <div class="d-flex flex-column flex-sm-row flex-nowrap">

      <b-button
        class="show-filters-button w-50 mb-3"
        @click="toggleFilters"
        size="sm"
      >Show filters</b-button>

      <b-list-group class="flex-column filters-list" :class="{ isOpen: isOpen }">

        <template v-for="(propertyOptions, propertyName) in filterProperties">
          <b-list-group-item
            :key="propertyName"
            class="p-2 pl-3 pr-3"
          >
            <FilterComponent
              :filterName="propertyName"
              :filterOptions="propertyOptions"
            />
          </b-list-group-item>
        </template>

      </b-list-group>

    <router-view></router-view>

  </div>

</b-container>
</template>

<script>
import { filterPropertiesValues } from '@/env/constants';
import SearchInput from '../filters/SearchInput.vue';
import SelectedFilters from '../filters/SelectedFilters.vue';
import FilterComponent from '../filters/FilterComponent.vue';

export default {
  name: 'DemandList',
  data() {
    return {
      filterProperties: filterPropertiesValues,
      isOpen: false,
    };
  },
  components: {
    SearchInput,
    SelectedFilters,
    FilterComponent,
  },
  methods: {
    toggleFilters() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.link {
  cursor: pointer;
  color: #325892;
}
.active {
  text-decoration: underline;
  font-weight: 500;
}
@media screen and (max-width: 575px ) {
    .view-links {
      margin-bottom: 10px;
      margin-left: 10px;
    }
    .filters-list {
      display: none;
    }
    .filters-list.isOpen {
      display: block;
    }
}
@media screen and (min-width: 576px ) {
    .filters-list {
        width: 35vw !important;
    }
    .show-filters-button {
      display: none;
    }
    .filters-list {
      display: block;
    }
}
@media screen and (min-width: 715px ) {
    .filters-list {
      width: 25vw !important;
    }
    .style-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
    }
    .view-links {
      margin-left: auto;
      margin-right: 150px;
    }
}
</style>
