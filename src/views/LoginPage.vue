<template>
  <div class="container">
    <b-card
      bg-variant="light"
      class="mt-5 mr-auto ml-auto login-form"
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
import { errors } from '@/env/constants';

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
          const errorMessage = error.code === errors.WRONG_PASSWORD || error.code === errors.USER_NOT_FOUND
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

<style scoped>
.login-form {
  box-shadow: 7px 7px 29px -6px rgba(0,0,0,0.24);
}
@media screen and (max-width: 549px) {
  .login-form {
    width: 90vw;
  }
}
@media screen and (min-width: 550px) {
  .login-form {
    width: 400px;
  }
}
@media screen and (min-width: 900px) {
  .login-form {
    width: 450px;
  }
}
</style>
