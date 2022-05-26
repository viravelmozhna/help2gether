<template>
  <div class="d-flex flex-row pl-2" v-if="selectedFilters.length !== 0">
    <span>Selected:</span>
    <ul class="list d-flex flex-row pl-0 mb-2">
      <li
        v-for="filter in selectedFilters"
        :key="filter[1]"
        class="ml-2 border rounded"
      >
        <b-badge variant="light">
          <button
            @click="deleteOneFilter(filter[0])"
            class="p-0 d-flex border-0 bg-transparent align-items-center"
          >
            <img src="../assets/cross.png" width="10" height="10">
            <span class="text ml-2">{{filter[1].toUpperCase()}}</span>
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
        if (item[1]) {
          filtersList.push(item);
        }
        return item;
      });

      return filtersList;
    },
  },
  methods: {
    deleteOneFilter(filter) {
      this.$store.dispatch('setActiveFiltersList', {
        [filter]: '',
      });
    },
    deleteAllFilters() {
      this.$store.dispatch('setActiveFiltersList', {
        region: '',
        status: '',
        emergency: '',
        category: '',
      });
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
