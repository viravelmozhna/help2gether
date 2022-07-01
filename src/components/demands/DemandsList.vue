<template>
<b-container fluid>

  <div class="controls-wrapper">
    <!-- TODO: implement search by city -->
    <!-- <SearchInput /> -->
    <SelectedFilters />

    <div class="view-links">
      <b-link
        to="/demands/list/list-view"
        class="link mr-3"
        exact-active-class="active"
      >List view</b-link>

      <b-link
        to="/demands/list/map-view"
        class="link"
        exact-active-class="active"
      >Map view</b-link>

    </div>
  </div>

  <div class="d-flex flex-column flex-sm-row flex-nowrap">
    <b-list-group class="flex-column filters-list">

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
import { filterPropertiesValues, modes } from '@/env/constants';
// import SearchInput from '../filters/SearchInput.vue';
import SelectedFilters from '../filters/SelectedFilters.vue';
import FilterComponent from '../filters/FilterComponent.vue';

export default {
  name: 'DemandList',
  data() {
    return {
      filterProperties: filterPropertiesValues,
      modes: modes,
    };
  },
  components: {
    SelectedFilters,
    FilterComponent,
  },
  methods: {
    changeViewMode(mode) {
      this.viewMode = mode;
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
@media screen and (min-width: 576px ) {
    .filters-list {
    width: 35vw;
    }
}
@media screen and (min-width: 715px ) {
    .filters-list {
    width: 25vw;
    }
    .controls-wrapper {
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
