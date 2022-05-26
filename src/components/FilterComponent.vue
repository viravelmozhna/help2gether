<template>
  <div>
    <p>{{name.toUpperCase()}}:</p>
    <ul class="list pl-0">
      <li v-for="option in options" :key="option">
        <input type="radio" id="option" :value="option" v-model="checkedOption" @click="setFilter(option)">
        <label for="option">{{option}}</label>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'FilterComponent',
  props: {
    name: String,
    options: Array,
  },
  data: function () {
    return {
      checkedOption: '',
    };
  },
  methods: {
    setFilter(option) {
      this.$store.dispatch('setActiveFiltersList', {
        [this.name]: option,
      });
    },
  },
};
</script>

<style scoped>
.list {
  list-style: none;
}
</style>
