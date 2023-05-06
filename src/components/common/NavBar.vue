<template>
  <b-navbar
    toggleable="md"
    type="light"
    variant="light"
    class="shadow-sm mb-3 bg-white rounded"
  >
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse
      id="nav-collapse"
      is-nav
    >
      <b-navbar-nav>
        <b-nav-item
          to="/demands/list"
          active-class="active"
          class="text-uppercase"
        >
          All demands
        </b-nav-item>
        <b-nav-item
          to="/user/demands"
          active-class="active"
          class="text-uppercase"
        >
          Your demands
        </b-nav-item>
        <b-nav-item
          to="/demands/add"
          active-class="active"
          class="text-uppercase"
        >
          Add demand
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <div
      v-if="isUserLoggedIn"
      class="ml-auto"
    >
      <span class="mr-3">
        Hello,
        <router-link :to="`/user/profile/${userData.id}`">
          <u class="link">
            <i>{{ userName }}</i>
          </u>
        </router-link>
      </span>
      <span class="text-uppercase logout-button">
        <a @click="logout">Logout</a>
      </span>
    </div>
  </b-navbar>
</template>

<script>
import { signOut } from 'firebase/auth';
import { getDatabase, ref, get, child } from 'firebase/database';
import { auth } from '@/firebase';

const db = getDatabase();

export default {
  name: 'NavBar',
  data() {
    return {
      userName: '',
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    userData() {
      return this.$store.getters.userData;
    },
  },
  created() {
    if (this.isUserLoggedIn) {
      get(child(ref(db), `users/${this.userData.id}`))
        .then((snapshot) => {
          const userData = snapshot.val();
          this.userName = `${userData.firstName} ${userData.lastName}`;
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error('Something went wrong! Try again later!', {
            timeout: 2500,
          });
        });
    }
  },
  methods: {
    logout() {
      signOut(auth).then(() => {
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
.link {
  cursor: pointer;
  color: #325892;
}
</style>
