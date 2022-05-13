<template>
    <nav>
      <router-link to="/demands/add">Add demands</router-link> |
      <router-link to="/demands/all">All demands</router-link> |
      <router-link to="/user/demands">Your demands</router-link> |
      <router-link to="/user/profile">Profile</router-link>
      <!-- <router-link to="/login">LOG OUT</router-link> -->
    </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>
