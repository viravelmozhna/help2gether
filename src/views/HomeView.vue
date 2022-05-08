<template>
  <div>
    <nav>
      <router-link to="/home/profile">Profile</router-link> |
      <router-link to="/home/all-requests">All requests</router-link> |
      <router-link to="/home/your-requests">Your requests</router-link> |
      <router-link to="/home/add-request">Add request</router-link> |
      <router-link to="/">LOG OUT</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>
