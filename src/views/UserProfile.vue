<template>
  <div class="container">
    <GoBackButton />
    <h1>Profile {{id}}</h1>
  </div>
</template>

<script>
import GoBackButton from '@/components/common/GoBackButton.vue';

export default {
  name: 'UserProfile',
  components: {
    GoBackButton,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>
