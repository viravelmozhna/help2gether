<template>
  <b-navbar toggleable="sm" type="light" variant="light" class="shadow-sm mb-3 bg-white rounded">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/demands/add" exact-active-class="active" class="text-uppercase">Add demand</b-nav-item>
        <b-nav-item to="/demands/list" exact-active-class="active" class="text-uppercase">All demands</b-nav-item>
        <b-nav-item to="/user/demands" exact-active-class="active" class="text-uppercase">Your demands</b-nav-item>
        <b-nav-item to="/user/profile" exact-active-class="active" class="text-uppercase">Profile</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <div v-if="isUserLoggedIn" class="ml-auto">
        <span class="mr-2">
          Hello, {{ userData.displayName }}
        </span>
        <span class="text-uppercase logout-button">
          <a @click="logout">Logout</a>
        </span>
      </div>
  </b-navbar>
</template>

<script>
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';

export default {
  name: 'NavBar',
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    userData() {
      return this.$store.getters.userData;
    },
  },
  methods: {
    logout() {
      signOut(auth)
        .then(() => {
          this.$store.dispatch('setUser', null);
          this.$toast.warning('You was logged out!', {
            timeout: 2000,
          });
          this.$router.push('/login');
        });
    },
  },
};
</script>

<style scoped>
.logout-button {
  cursor: pointer;
}
</style>
