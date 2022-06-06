<template>
    <b-form
      @submit.prevent="setFilter"
      class="mb-2 d-flex search-input"
    >
      <b-form-select
          :options="regions"
          v-model="region"
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
      /*
      * According to the Vue.js docs a default value must be choosed:
      *
      * If the initial value of your v-model expression does not match any of the options,
      * the <select> element will render in an “unselected” state.
      * On iOS, this will prevent the user from being able to select the first item,
      * because iOS does not fire a change event in this case.
      *
      * In other cases we can set a default value like a 'Please, choose a region', as first option,
      * and make it disabled, but as I render options from an array I can't make one option disabled.
      */
      region: 'Kharkiv',

    };
  },
  methods: {
    setFilter() {
      this.$store.dispatch('addFilter', {
        propertyName: 'region',
        propertyValue: `${this.region.toLowerCase()} region`,
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
