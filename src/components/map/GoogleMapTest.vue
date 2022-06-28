<template>
  <div>
    <GoogleAutocomplete v-on:getAddress="getAddress"/>
    <button @click="addLocationMarker">Add</button>

    <GoogleMap
      :center="center">
      <template v-for="marker in locationMarkers">
        <GoogleMarker
          :marker="marker.position"
          :index="marker.index"
          :key="marker.index"
          @click="center=marker.position"
        />
      </template>
    </GoogleMap>
  </div>
</template>

<script>
import GoogleAutocomplete from './GoogleAutocomplete.vue';
import GoogleMarker from './GoogleMarker.vue';
import GoogleMap from './GoogleMap.vue';

export default {
  name: 'GoogleMapTest',
  components: {
    GoogleAutocomplete,
    GoogleMarker,
    GoogleMap,
  },
  data() {
    return {
      center: {
        lat: 39.7837304,
        lng: -100.4458825,
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
    };
  },
  mounted() {
    this.locateGeoLocation();
  },

  methods: {
    getAddress(e) {
      console.log(e);
      this.existingPlace = e;
      // this.region = e.formattedAddress.split(',').slice(0, 4)[3].trim();
      // this.city = e.formattedAddress.split(',').slice(0, 4)[2].trim();
      // this.street = e.formattedAddress.split(',').slice(0, 2).join(',').trim();
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.coords.lat,
          lng: this.existingPlace.coords.lng,
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function () {
      navigator.geolocation.getCurrentPosition((res) => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        };
      });
    },
  },
};
</script>

<style scoped>
.autocomplete{
  width: 500px;
}
</style>
