<template>
  <div>
    <b-form
      class="mb-2 d-flex search-input position-relative"
      @submit.prevent="getDemandsByCity"
    >
      <b-input
        v-model="searchQuery"
        autocomplete="off"
        placeholder="Search by city"
        @input="setMatchedCityList"
      >
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
      class="position-absolute matched-regions-list"
    >
      <li
        v-for="city in matchedCities"
        :key="city"
        @click="chooseMatchedCity(city)"
        class="matched-regions-list__item mb-2"
      >
        <span>{{ city }}</span>
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
      matchedCities: [],
    };
  },
  computed: {
    cities() {
      return this.$store.state.cities;
    },
  },
  methods: {
    setFilter() {
      if (this.searchQuery.trim().length) {
        this.$store.dispatch('addFilter', {
          propertyName: 'city',
          propertyValue: `${this.searchQuery.toLowerCase()}`,
        });
      }
    },
    setMatchedCityList() {
      this.resetMatchedCitiesList();
      if (this.searchQuery.trim().length) {
        this.cities.forEach((city) => {
          if (city.toLowerCase().includes(this.searchQuery.toLowerCase())) {
            this.matchedCities.push(city);
          }
        });
      }
    },
    resetMatchedCitiesList() {
      this.matchedCities.length = 0;
    },
    getDemandsByCity() {
      this.setFilter();
      this.resetMatchedCitiesList();
      this.searchQuery = '';
    },
    chooseMatchedCity(city) {
      this.searchQuery = city;
      this.getDemandsByCity();
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
  box-shadow: 7px 7px 29px -6px rgba(0, 0, 0, 0.24);
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
