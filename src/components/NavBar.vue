<template>
  <b-navbar toggleable="sm" type="light" variant="light" class="shadow-sm mb-3 bg-white rounded">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/demands/add" exact-active-class="active" class="text-uppercase">Add demand</b-nav-item>
        <b-nav-item to="/demands/list" exact-active-class="active" class="text-uppercase">All demands</b-nav-item>
        <b-nav-item to="/user/demands" exact-active-class="active" class="text-uppercase">Your demands</b-nav-item>
        <b-nav-item to="/user/profile" exact-active-class="active" class="text-uppercase">Profile</b-nav-item>
        <b-nav-item>
          <span v-if="isLoggedIn">
            <a @click="logout">Logout</a>
          </span>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';

export default {
  name: 'NavBar',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$store.dispatch('setUser', null);
        })
        .then(() => {
          this.$router.push('/login');
        });
    },
  },
};
</script>
