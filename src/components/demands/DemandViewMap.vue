<template>
  <LeafletMap
    v-if="demands"
    :zoomNumber="zoomNumber"
  >
    <MapMarker
      v-for="demand in demandsWithCoords"
      :marker="demand[1].contactData.address.coords"
      :key="demand[0]"
    >
      <MapPopup>
        <div class="info-window">
          <DemandItem
            :status="demand[1].status"
            :emergency="demand[1].emergency"
            :category="demand[1].category"
            :demand="demand[1].demand"
            :createdTime="demand[1].createdTime"
            :createdAt="demand[1].createdAt"
            :city="demand[1].contactData.address.city"
            :id="demand[0]"
          />
        </div>
      </MapPopup>
    </MapMarker>
  </LeafletMap>
</template>

<script>
import { filterPropertiesValues, zoomMapNumbers } from '@/env/constants';
import hasValidCoords from '@/utils/hasValidCoords';
import DemandItem from './DemandItem.vue';
import LeafletMap from '../map/LeafletMap.vue';
import MapMarker from '../map/MapMarker.vue';
import MapPopup from '../map/MapPopup.vue';

export default {
  name: 'DemandViewMap',
  components: {
    DemandItem,
    LeafletMap,
    MapMarker,
    MapPopup,
  },
  data() {
    return {
      filterProperties: filterPropertiesValues,
      zoomNumber: zoomMapNumbers.MAP_LIST_VALUE,
    };
  },
  computed: {
    demands() {
      return this.$store.getters.filteredDemands;
    },
    demandsWithCoords() {
      return this.demands.filter((demand) => {
        const address = demand[1] && demand[1].contactData && demand[1].contactData.address;
        return hasValidCoords(address && address.coords);
      });
    },
  },
};
</script>

<style scoped>
.info-window {
  min-width: 180px;
}
@media screen and (min-width: 715px) {
  .info-window {
    min-width: 250px;
  }
}
</style>
