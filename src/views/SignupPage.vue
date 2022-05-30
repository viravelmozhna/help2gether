<template>
  <div class="container">
    <b-card
      bg-variant="light"
      class="w-50 mt-5 mr-auto ml-auto"
    >
      <h1 class="text-center title">Sign Up</h1>
      <b-form @submit.prevent="userRegistration">
        <b-form-group
          label="Name"
          label-for="name"
        >
          <b-form-input
            id="name"
            type="text"
            v-model="user.name"
          >
          </b-form-input>
        </b-form-group>
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
          Sign Up
        </b-button>
        <p class="mb-0">
          Already registered?
          <router-link to="/login">Log in!</router-link>
        </p>
        </b-form>
      </b-card>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
export default {
  name: 'SignupPage',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    userRegistration() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then((userCredential) => {
          const { user } = userCredential;
          user.displayName = this.user.name;
        })
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: this.user.name,
          });
        })
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

<style scoped>
.title {
  font-size: 30px;
}
</style>
