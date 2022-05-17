<template>
  <div>
    <button @click="goBack">Go back to the list</button>
    <h1>Detailed info about demand -- {{ id }}</h1>
  </div>
</template>

<script>
export default {
  name: 'DemandDetailedInfoPage',
  data() {
    return {
      id: this.$route.params.id,
      from: null,
    };
  },
  methods: {
    goBack() {
      this.$router.push({ path: this.from });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.from = from.path;
    });
  },
};
</script>
