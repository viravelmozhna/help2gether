<template>
    <gmap-autocomplete
      @place_changed="getAddress"
      :componentRestrictions="{country: 'ua'}"
      class="w-100 autocomplete rounded"
      ></gmap-autocomplete>
</template>

<script>
export default {
  name: 'GoogleAutocomplete',
  methods: {
    getAddress(loc) {
      const city = loc.address_components.find((item) => {
        return item.types.includes('locality');
      });
      const address = {
        city: city.long_name,
        formattedAddress: loc.formatted_address,
        coords: {
          lat: loc.geometry.location.lat(),
          lng: loc.geometry.location.lng(),
        },
      };
      this.$emit('getAddress', address);
    },
  },
};
</script>

<style scoped>
.autocomplete {
  height: 40px;
  border: 1px solid lightgray;
  color: #495057;
  padding-left: 12px;
}
</style>
