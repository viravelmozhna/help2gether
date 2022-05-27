<template>
  <div class="d-flex flex-row pl-2" v-if="selectedFilters.length !== 0">
    <span>Selected:</span>
    <ul class="list d-flex flex-row flex-wrap pl-0 mb-2">
      <li
        v-for="filter in selectedFilters"
        :key="filter"
        class="ml-2 border rounded"
      >
        <b-badge variant="light">
          <button
            @click="deleteOneFilter(filter)"
            class="p-0 d-flex border-0 bg-transparent align-items-center"
          >
            <img src="../assets/cross.png" width="10" height="10">
            <span class="text ml-2">{{filter.toUpperCase()}}</span>
          </button>
          </b-badge>
      </li>
    </ul>
      <button
        v-if="selectedFilters.length > 1"
        @click="deleteAllFilters()"
        class="mb-2 ml-2 p-0 bg-transparent border-0"
      >
        <span class="border-bottom border-secondary">Reset all</span>
      </button>
  </div>
</template>

<script>
export default {
  name: 'SelectedFilters',
  computed: {
    selectedFilters() {
      const list = Object.entries(this.$store.state.activeFiltersList);
      const filtersList = [];

      list.map((item) => {
        if (item[1].length > 0) {
          item[1].map((property) => {
            filtersList.push(property);
            return property;
          });
        }
        return item;
      });
      return filtersList;
    },
  },
  methods: {
    deleteOneFilter(filter) {
      // console.log('filter', filter);
      let propertyName = 'region';
      if (filter === 'active' || filter === 'in progress' || filter === 'completed') {
        propertyName = 'status';
      }
      if (filter === 'urgent' || filter === 'non-urgent') {
        propertyName = 'emergency';
      }
      if (filter === 'food' || filter === 'clothes' || filter === 'medicines' || filter === 'other') {
        propertyName = 'category';
      }
      // console.log('propertyName', propertyName);
      this.$store.dispatch('deleteFilter', {
        propertyName: [propertyName],
        propertyValue: filter,
      });
    },
    deleteAllFilters() {
      this.$store.dispatch('deleteAllFilters');
    },
  },
};
</script>

<style scoped>
.text {
  font-weight: 500;
}
.list {
  list-style: none;
}
</style>
