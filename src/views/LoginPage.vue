<template>
  <div class="container">
    <b-card
      bg-variant="light"
      class="w-50 mt-5 mr-auto ml-auto"
    >
      <h1 class="text-center title">Log In</h1>
      <b-form @submit.prevent="userLogin">
        <b-form-group
          label="Email"
          label-for="email"
        >
          <b-form-input
            id="email"
            type="text"
            v-model="user.email"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          label="Password"
          label-for="password"
        >
          <b-form-input
            id="password"
            type="text"
            v-model="user.password"
          >
          </b-form-input>
        </b-form-group>
        <b-button
          type="submit"
          class="w-100 mb-2"
          size="lg"
          variant="dark"
        >
          Log In
        </b-button>
        <p class="mb-0">
          Not registered yet?
          <router-link to="/signup">Sign up!</router-link>
        </p>
        </b-form>
      </b-card>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
export default {
  name: 'LoginPage',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    userLogin() {
      const auth = getAuth();
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, this.user.email, this.user.password);
        });
      signInWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then(() => {
          this.$router.push('/demands/list');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
