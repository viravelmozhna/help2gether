<template>
    <b-form
      @submit.prevent="setFilter"
      class="w-75 mb-2 d-flex position-relative"
    >
      <b-form-input
        v-model.trim="searchQuery"
        placeholder="Search by region (Kyiv, Kharkiv etc.)"
      >
      </b-form-input>
      <b-button type="submit" class="position-absolute find-button">
        Find
      </b-button>
    </b-form>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    setFilter(e) {
      this.$store.dispatch('setActiveFiltersList', {
        region: `${this.searchQuery} region`,
      });
      e.target.reset();
    },
  },
};
</script>

<style scoped>
.find-button {
  top: 0;
  right: 0;
}
</style>
