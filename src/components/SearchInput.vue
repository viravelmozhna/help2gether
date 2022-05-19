<template>
  <div class="container">
    <input v-model.trim="message" placeholder="Search by region">
    <p>Region: {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      message: '',
    };
  },
};
</script>
