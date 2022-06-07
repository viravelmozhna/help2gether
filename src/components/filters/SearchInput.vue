<template>
    <b-form
      @submit.prevent="setFilter"
      class="mb-2 d-flex search-input"
    >
      <b-form-select
          :options="regions"
          v-model="selectedRegion"
          required
        ></b-form-select>
      <b-button
        type="submit"
        variant="dark"
      >
        Find
      </b-button>
    </b-form>
</template>

<script>
import { regions } from '@/env/constants';

export default {
  name: 'SearchInput',
  data() {
    return {
      regions: regions,
      selectedRegion: 'Kharkiv',

    };
  },
  methods: {
    setFilter() {
      this.$store.dispatch('addFilter', {
        propertyName: 'region',
        propertyValue: `${this.selectedRegion.toLowerCase()} region`,
      });
    },
  },
};
</script>

<style scoped>
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
