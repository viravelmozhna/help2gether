<template>
    <gmap-map
        :zoom="zoomMap"
        :center="centeredMapAtCoords"
        style="width:100%;  height: 400px;"
        class="mb-3"
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
