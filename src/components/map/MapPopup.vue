<template>
  <l-popup :options="popupOptions">
    <slot></slot>
  </l-popup>
</template>

<script>
export default {
  name: 'MapPopup',
  props: {
    // Kept for backward compatibility with existing parents
    position: Object,
    isInfoWindowOpen: Boolean,
  },
  computed: {
    popupOptions() {
      return {
        maxWidth: 320,
      };
    },
  },
};
</script>
