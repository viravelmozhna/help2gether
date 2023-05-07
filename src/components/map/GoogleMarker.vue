<template>
  <gmap-marker
    :position="marker"
    :clickable="true"
    @click="toggleInfoWindow"
  ></gmap-marker>
</template>

<script>
export default {
  name: 'GoogleMarker',
  props: {
    marker: Object,
    index: Number,
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
