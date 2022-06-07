<template>
  <div>
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';

export default {
  name: 'DemandsPage',
  components: {
    NavBar,
  },
};
</script>
