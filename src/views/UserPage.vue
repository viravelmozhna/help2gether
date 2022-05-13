<template>
  <div>
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';

export default {
  name: 'UserPage',
  components: {
    NavBar,
  },
};
</script>
