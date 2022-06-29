<template>
  <gmap-map
        :zoom="zoomMap"
        :center="centerCoords"
        style="width:100%;  height: 400px;"
        class="mb-3"
      >

      <slot></slot>

    </gmap-map>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: {
    center: Object,
    zoom: Number,
  },
  computed: {
    centerCoords() {
      return this.center || {
        lat: 49.9935,
        lng: 36.2304,
      };
    },
    zoomMap() {
      return this.zoom || 13;
    },
  },
};
</script>
