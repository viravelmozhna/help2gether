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
            type="email"
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
            type="password"
            v-model="user.password"
          >
          </b-form-input>
          <p class="mb-0 text-right">
            Forgot the password?
            <router-link to="/reset-password">Reset it!</router-link>
          </p>
        </b-form-group>
        <b-button
          type="submit"
          class="w-100 mb-2"
          size="lg"
          variant="dark"
        >
          Log In
        </b-button>
        <p class="mb-0 text-right">
          Not registered yet?
          <router-link to="/signup">Sign up!</router-link>
        </p>
        </b-form>
      </b-card>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

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
      signInWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then(() => {
          this.$toast.success('You was logged in!', {
            timeout: 2500,
          });
          this.$router.push('/demands/list');
        })
        .catch((error) => {
          const errorMessage = error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'
            ? 'Incorrect email or password!'
            : 'Something went wrong! Try again later!';
          this.$toast.error(`${errorMessage}`, {
            timeout: 2500,
          });
        });
    },
  },
};
</script>
