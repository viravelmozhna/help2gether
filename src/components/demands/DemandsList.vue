<template>
<b-container fluid>
  <!-- TODO: implement search by city -->
  <!-- <SearchInput /> -->
  <SelectedFilters />

  <b-button
    @click="changeViewMode"
    class="mb-2"
    variant="light">
      <span><b>Map view</b> | List view</span>
  </b-button>

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

    <b-container
      fluid
      v-if="demands && listMode">
        <b-row
          cols="1"
          cols-sm="3"
          cols-md="4"
          cols-lg="5"
          cols-xl="6"
          tag="ul"
          no-gutters
          class="p-0 mw-100 demands-list"
          align-h="center">

        <!-- Structure of demand: ['demand-id', {demand-data}] -->
        <template v-for="demand in demands">
          <DemandItem
            :status="demand[1].status"
            :emergency="demand[1].emergency"
            :category="demand[1].category"
            :demand="demand[1].demand"
            :createdTime="demand[1].createdTime"
            :city="demand[1].contactData.address.city"
            :id="demand[0]"
            :key="demand[0]"
          />
        </template>

      </b-row>
    </b-container>

    <GoogleMap
      v-else-if="demands && !listMode"
      :zoom="zoom"
      class="ml-3 mr-2">

      <GoogleInfoWindow
        v-if="currentMarker"
        :position="currentMarker[1].contactData.address.coords"
        :isInfoWindowOpen="isInfoWindowOpen"
        v-on:closeInfoWindow="closeInfoWindow">

        <DemandItem
            :status="currentMarker[1].status"
            :emergency="currentMarker[1].emergency"
            :category="currentMarker[1].category"
            :demand="currentMarker[1].demand"
            :createdTime="currentMarker[1].createdTime"
            :city="currentMarker[1].contactData.address.city"
            :id="currentMarker[0]"
          />

      </GoogleInfoWindow>

        <GoogleMarker
          v-for="(demand, index) in demands"
          :marker="demand[1].contactData.address.coords"
          :index="index"
          :key="demand[0]"
          v-on:clickOnMarker="clickOnMarker"
          />
    </GoogleMap>
  </div>

</b-container>
</template>

<script>
import { filterPropertiesValues } from '@/env/constants';
import DemandItem from './DemandItem.vue';
// import SearchInput from '../filters/SearchInput.vue';
import SelectedFilters from '../filters/SelectedFilters.vue';
import FilterComponent from '../filters/FilterComponent.vue';
import GoogleMap from '../map/GoogleMap.vue';
import GoogleMarker from '../map/GoogleMarker.vue';
import GoogleInfoWindow from '../map/GoogleInfoWindow.vue';

export default {
  data() {
    return {
      filterProperties: filterPropertiesValues,
      listMode: true,
      zoom: 6,
      currentMarker: null,
      currentMarkerIndex: null,
      isInfoWindowOpen: false,
    };
  },
  computed: {
    demands() {
      return this.$store.getters.filteredDemands;
    },
  },
  components: {
    DemandItem,
    // SearchInput,
    SelectedFilters,
    FilterComponent,
    GoogleMap,
    GoogleMarker,
    GoogleInfoWindow,
  },
  methods: {
    changeViewMode() {
      this.listMode = !this.listMode;
      this.zoom = 11;
    },
    clickOnMarker(e) {
      this.currentMarker = this.demands[e.index];

      if (this.currentMarkerIndex === e.index) {
        this.isInfoWindowOpen = !this.isInfoWindowOpen;
      } else {
        this.isInfoWindowOpen = true;
        this.currentMarkerIndex = e.index;
      };
    },
    closeInfoWindow() {
      this.isInfoWindowOpen = false;
    },
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
