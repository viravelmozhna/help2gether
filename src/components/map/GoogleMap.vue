<template>
    <gmap-map
        :zoom="zoomMap"
        :center="centeredMapAtCoords"
        class="map-view"
        :class="{ formMap: isHeightSet }"
      >

      <slot>
      </slot>

    </gmap-map>
</template>

<script>
import { coords, zoomMapNumbers } from '@/env/constants';

export default {
  name: 'GoogleMap',
  props: {
    centeredCoords: Object,
    zoomNumber: Number,
    isHeightSet: Boolean,
  },
  computed: {
    centeredMapAtCoords() {
      return this.centeredCoords || coords.KHARKIV_COORDS;
    },
    zoomMap() {
      return this.zoomNumber || zoomMapNumbers.DEFAULT_VALUE;
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 575px ) {
    .map-view {
      height: 400px;
    }
}
@media screen and (min-width: 576px ) {
    .map-view {
      width: 100vw;
      margin-left: 12px;
    }
    .formMap {
      height: 400px;
      width: 100%;
      margin-left: 0;
    }
}
</style>
