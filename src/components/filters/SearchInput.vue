<template>
   <div>
     <b-form
      class="mb-2 d-flex search-input position-relative"
      @submit.prevent="getDemandsByCity"
    >
      <b-input
        v-model="selectedCity"
        autocomplete="off"
        placeholder="Search by city"
        @input="e => setMatchedCityList(e)">
      </b-input>

      <b-button
        type="submit"
        variant="dark"
      >
        Find
      </b-button>
    </b-form>

    <b-card
      v-if="matchedCities.length !== 0"
      class="position-absolute matched-regions-list">
        <li
          v-for="city in matchedCities"
          :key="city"
          @click="chooseMatchedCity(city)"
          class="matched-regions-list__item mb-2">
          <span>{{city}}</span>
        </li>
    </b-card>
   </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      searchQuery: '',
      selectedCity: '',
      matchedCities: [],
    };
  },
  computed: {
    cities() {
      return this.$store.state.cities;
    },
  },
  methods: {
    setMatchedCityList(e) {
      this.searchQuery = e.toLowerCase();
      this.resetMatchedCitiesList();
      this.cities.forEach((city) => {
        if (city.toLowerCase().includes(this.searchQuery)) {
          this.matchedCities.push(city);
        }
      });
    },
    resetMatchedCitiesList() {
      this.matchedCities.length = 0;
    },
    setFilter() {
      this.$store.dispatch('addFilter', {
        propertyName: 'city',
        propertyValue: `${this.selectedCity.toLowerCase()}`,
      });
    },
    getDemandsByCity() {
      this.resetMatchedCitiesList();
      this.setFilter();
    },
    chooseMatchedCity(city) {
      this.selectedCity = city;
      this.getDemandsByCity();
      this.selectedCity = '';
    },
  },
};
</script>

<style scoped>
.matched-regions-list {
  list-style: none;
  background-color: #ffffff;
  top: 110px;
  left: 30px;
  width: 200px;
  z-index: 999;
  box-shadow: 7px 7px 29px -6px rgba(0,0,0,0.24);
}
.matched-regions-list__item:hover {
  cursor: pointer;
  transform: scale(1.02);
}
@media screen and (max-width: 991px) {
  .search-input {
    width: 90vw;
  }
}
@media screen and (min-width: 992px) {
  .search-input {
    width: 40vw;
  }
}
</style>
