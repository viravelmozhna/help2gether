<template>
  <gmap-info-window
    :position="position"
    :opened="isInfoWindowOpen"
    @closeclick="closeInfoWindow">
  <slot></slot>
  </gmap-info-window>
</template>

<script>
export default {
  name: 'GoogleInfoWindow',
  props: {
    position: Object,
    isInfoWindowOpen: Boolean,
  },
  methods: {
    closeInfoWindow() {
      this.$emit('closeInfoWindow', false);
    },
  },
};
</script>
