<template>
  <div>
    <p class="border-bottom text-uppercase font-weight-bold">{{filterName}}:</p>
    <ul class="filter-options-list pl-0">
      <li
        v-for="filterOption in filterOptions"
        :key="filterOption"
      >
        <input
          type="checkbox"
          :id="filterName + filterOption"
          :value="filterOption"
          :checked="activeFilters.includes(filterOption)"
          @change="check($event, filterOption)"
        />
        <label
          :for="filterName + filterOption"
          class="ml-2 text-capitalize"
        >
        {{filterOption}}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'FilterComponent',
  props: {
    filterName: String,
    filterOptions: Array,
  },
  computed: {
    activeFilters() {
      const activeFilters = this.$store.state.activeFiltersList[this.filterName];
      return activeFilters;
    },
  },
  methods: {
    check(e, filterOption) {
      if (e.target.checked) {
        this.$store.dispatch('addFilter', {
          propertyName: this.filterName,
          propertyValue: filterOption,
        });
      } else {
        this.$store.dispatch('deleteFilter', {
          propertyName: this.filterName,
          propertyValue: filterOption,
        });
      }
    },
  },
};
</script>

<style scoped>
.filter-options-list {
  list-style: none;
}
</style>
