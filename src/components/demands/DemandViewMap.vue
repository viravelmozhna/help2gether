<template>
  <GoogleMap
      v-if="demands"
      :zoomNumber="zoomNumber"
      class="">

      <GoogleInfoWindow
        v-if="currentMarker"
        :position="currentMarker[1].contactData.address.coords"
        :isInfoWindowOpen="isInfoWindowOpen"
        v-on:closeInfoWindow="closeInfoWindow">

        <div class="info-window">
          <DemandItem
            :status="currentMarker[1].status"
            :emergency="currentMarker[1].emergency"
            :category="currentMarker[1].category"
            :demand="currentMarker[1].demand"
            :createdTime="currentMarker[1].createdTime"
            :city="currentMarker[1].contactData.address.city"
            :id="currentMarker[0]"
          />
        </div>

      </GoogleInfoWindow>

        <GoogleMarker
          v-for="(demand, index) in demands"
          :marker="demand[1].contactData.address.coords"
          :index="index"
          :key="demand[0]"
          v-on:clickOnMarker="clickOnMarker"
          />
    </GoogleMap>
</template>

<script>
import { filterPropertiesValues, zoomMapNumbers } from '@/env/constants';
import DemandItem from './DemandItem.vue';
import GoogleMap from '../map/GoogleMap.vue';
import GoogleMarker from '../map/GoogleMarker.vue';
import GoogleInfoWindow from '../map/GoogleInfoWindow.vue';

export default {
  name: 'DemandViewMap',
  components: {
    DemandItem,
    GoogleMap,
    GoogleMarker,
    GoogleInfoWindow,
  },
  data() {
    return {
      filterProperties: filterPropertiesValues,
      zoomNumber: zoomMapNumbers.MAP_LIST_VALUE,
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
  methods: {
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
.info-window {
  min-width: 180px;
}
@media screen and (min-width: 715px ) {
  .info-window {
    min-width: 250px;
  }
}
</style>
