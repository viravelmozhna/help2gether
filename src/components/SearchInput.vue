<template>
    <b-form
      @submit.prevent="setFilter"
      class="w-50 mb-2"
    >
      <b-form-input
        v-model.trim="message"
        placeholder="Search by region (Kyiv, Kharkiv etc.)"
      >
      </b-form-input>
    </b-form>
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
