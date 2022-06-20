<template>
   <div>
     <b-form
      @submit.prevent="formSubmitHandler"
      class="mb-2 d-flex search-input position-relative"
    >
      <b-input
        v-model="selectedRegion"
        autocomplete="off"
        @input="e => setMatchedRegionsList(e)">
      </b-input>

      <b-button
        type="submit"
        variant="dark"
      >
        Find
      </b-button>
    </b-form>

    <b-card
      v-if="matchedRegions !== null"
      class="position-absolute matched-regions-list">
        <li
          v-for="region in matchedRegions"
          :key="region"
          @click="chooseMatchedRegion(region)"
          class="matched-regions-list__item mb-2">
          {{region}}
        </li>
    </b-card>
   </div>
</template>

<script>
import searchRegionsByQuery from '@/utils/binarySearchTree';

export default {
  name: 'SearchInput',
  data() {
    return {
      selectedRegion: '',
      matchedRegions: null,
    };
  },
  methods: {
    chooseMatchedRegion(region) {
      this.selectedRegion = region;
      this.setFilter();
      this.selectedRegion = '';
      this.resetMatchedRegionsList();
    },
    setMatchedRegionsList(e) {
      this.matchedRegions = searchRegionsByQuery(e);
    },
    resetMatchedRegionsList() {
      this.matchedRegions = null;
    },
    setFilter() {
      this.$store.dispatch('addFilter', {
        propertyName: 'region',
        propertyValue: `${this.selectedRegion.toLowerCase()} region`,
      });
    },
    formSubmitHandler() {
      this.resetMatchedRegionsList();
      this.setFilter();
    },
  },
};
</script>

<style scoped>
.matched-regions-list {
  list-style: none;
  background-color: white;
  top: 110px;
  left: 30px;
  width: 250px;
  z-index: 999;
  box-shadow: 7px 7px 29px -6px rgba(0,0,0,0.24);
}
.matched-regions-list__item {
  cursor: pointer;
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
