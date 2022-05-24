<template>
  <div class="wrapper">
    <span>Selected:</span>
    <ul class="list">
      <li v-for="filter in selectedFilters" :key="filter" class="ml-2">
        <b-badge variant="warning">
          <button class="my-button" @click="deleteFilter(filter)"><img src="../assests/cross.png" width="10" height="10"></button>
          <span class="text ml-2">{{filter}}</span>
        </b-badge>
      </li>
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

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
}
.text {
  font-weight: 500;
}
.list {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: row;
}
.my-button {
  border: none;
  background-color: transparent;
  padding: 0;
  width: 10px;
  height: 10px;
}
img {
  vertical-align: baseline;
}
</style>
