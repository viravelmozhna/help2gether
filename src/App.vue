<template>
  <div id="app">
    <nav>
      <!-- When the authentication will be implemented, route "/" will be removed from navigation.
      It will be showed only on the first visit before the user will be logged in -->
      <router-link to="/">Start page</router-link> |
      <!-- When the authentication will be implemented, route "/profile" will be dynamic -->
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/all-requests">All requests</router-link> |
      <router-link to="/your-requests">Your requests</router-link> |
      <router-link to="/add-request">Add request</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
