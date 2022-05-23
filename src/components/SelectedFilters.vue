<template>
  <div>
    <p>Selected:</p>
    <ul v-for="filter in selectedFilters" :key="filter">
      <li>
        <button @click="deleteFilter(filter)">delete</button>{{filter}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SelectedFilters',
  computed: {
    selectedFilters() {
      const { region, status, emergency, category } = this.$store.state.activeFiltersList;

      const filtersList = [];

      if (region) {
        filtersList.push(region.toUpperCase());
      };

      if (status) {
        filtersList.push(status.toUpperCase());
      };

      if (emergency) {
        filtersList.push(emergency.toUpperCase());
      };

      if (category) {
        filtersList.push(category.toUpperCase());
      };

      // return filtersList.length > 0 ? filtersList.join(',') : '';
      return filtersList;
    },
  },
  methods: {
    deleteFilter(filter0) {
      const filter = filter0.toLowerCase();
      let filter1 = 'region';

      if (filter === 'active' || filter === 'in progress' || filter === 'completed') {
        filter1 = 'status';
      }

      if (filter === 'urgent' || filter === 'non-urgent') {
        filter1 = 'emergency';
      }
      if (filter === 'food' || filter === 'medicine' || filter === 'clothes' || filter === 'other') {
        filter1 = 'category';
      }

      this.$store.dispatch('setActiveFiltersList', {
        [filter1]: '',
      });
    },
  },
};
</script>
