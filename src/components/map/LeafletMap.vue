<template>
  <l-map
    :zoom="zoomMap"
    :center="centeredMapAtCoords"
    :options="{ scrollWheelZoom: true }"
    class="map-view"
    :class="{ formMap: isHeightSet }"
  >
    <l-tile-layer
      :url="tileUrl"
      :attribution="attribution"
    />
    <slot></slot>
  </l-map>
</template>

<script>
import { coords, zoomMapNumbers } from '@/env/constants';

export default {
  name: 'LeafletMap',
  props: {
    centeredCoords: Object,
    zoomNumber: Number,
    isHeightSet: Boolean,
  },
  data() {
    return {
      tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    };
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
.map-view {
  height: 70vh;
  min-height: 400px;
  z-index: 0;
}
@media screen and (min-width: 576px) {
  .map-view {
    width: 100vw;
    margin-left: 12px;
  }
  .formMap {
    height: 400px;
    min-height: 400px;
    width: 100%;
    margin-left: 0;
  }
}
</style>
