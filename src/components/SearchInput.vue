<template>
    <form @submit.prevent="setFilter">
      <input v-model.trim="message" placeholder="Search by region">
    </form>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      message: '',
    };
  },
  methods: {
    setFilter(e) {
      this.$store.dispatch('setActiveFiltersList', {
        region: this.message,
      });
      e.target.reset();
    },
  },
};
</script>
