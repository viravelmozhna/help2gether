<template>
  <div>
    <p>{{filterName.toUpperCase()}}:</p>
    <ul class="list pl-0">
      <li v-for="option in options" :key="option">
        <input type="checkbox" :id="filterName + option" :value="option" v-model="checkedOptions" @change="check($event, option)"/>
        <label :for="filterName + option">{{option}}</label>
      </li>
    </ul>
    <p>{{checkedOptions}}</p>
    <p>{{isChecked}}</p>
  </div>
</template>

<script>

export default {
  name: 'FilterComponent',
  props: {
    filterName: String,
    options: Array,
  },
  data: function () {
    return {
      checkedOptions: [],
    };
  },
  computed: {
    isChecked() {
      const activeFilters = this.$store.state.activeFiltersList[this.filterName];
      // const obj = {};
      // this.options.map((opt) => {
      //   if (activeFilters.includes(opt)) {
      //     obj[opt] = true;
      //   } else {
      //     obj[opt] = false;
      //   }
      //   return opt;
      // });
      // const aaa = this.checkedOptions.filter((option) => {
      //   return activeFilters.includes(option);
      // });
      return activeFilters;
    },
  },
  methods: {
    check(e, option) {
      if (e.target.checked) {
        this.$store.dispatch('addFilter', {
          propertyName: this.filterName,
          propertyValue: option,
        });
      } else {
        this.$store.dispatch('deleteFilter', {
          propertyName: this.filterName,
          propertyValue: option,
        });
      }
    },
  },
};
</script>

<style scoped>
.list {
  list-style: none;
}
</style>
