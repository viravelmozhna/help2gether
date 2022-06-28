<template>
  <gmap-map
        :zoom="zoom"
        :center="center"
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
};
</script>
