<template>
    <b-button
      @click="goBack"
      size="sm"
      variant="link"
      class="mb-2"
    >
      <u>Go back to the list</u>
    </b-button>
</template>

<script>
export default {
  name: 'GoBackButton',
  computed: {
    goBackToUrl() {
      return this.$store.state.goBackToUrl;
    },
  },
  methods: {
    goBack() {
      this.$router.push({ path: this.goBackToUrl });
    },
  },
};
</script>
