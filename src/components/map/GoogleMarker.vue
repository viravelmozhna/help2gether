<template>
  <gmap-marker
    :position="marker"
  ></gmap-marker>
</template>

<script>
export default {
  name: 'GoogleMarker',
  props: {
    marker: Object,
  },
};
</script>
