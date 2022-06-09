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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
