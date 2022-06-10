<template>
    <b-button
      @click="goBack"
      size="sm"
      variant="link"
      class="mb-2 ml-3 link"
    >
      <u>Go back</u>
    </b-button>
</template>

<script>
export default {
  name: 'GoBackButton',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.link {
  color: #325892;
}
</style>
