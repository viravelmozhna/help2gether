<template>
  <l-marker
    v-if="hasValidCoords"
    :lat-lng="latLng"
    @click="toggleInfoWindow"
  >
    <slot></slot>
  </l-marker>
</template>

<script>
import checkValidCoords from '@/utils/hasValidCoords';

export default {
  name: 'MapMarker',
  props: {
    marker: Object,
    index: Number,
  },
  computed: {
    hasValidCoords() {
      return checkValidCoords(this.marker);
    },
    latLng() {
      return {
        lat: this.marker.lat,
        lng: this.marker.lng,
      };
    },
  },
  methods: {
    toggleInfoWindow() {
      this.$emit('clickOnMarker', {
        index: this.index,
      });
    },
  },
};
</script>
