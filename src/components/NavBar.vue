<template>
    <nav>
      <router-link to="/demands/add">Add demands</router-link> |
      <router-link to="/demands/list">All demands</router-link> |
      <router-link to="/user/demands">Your demands</router-link> |
      <router-link to="/user/profile">Profile</router-link>
    </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>
