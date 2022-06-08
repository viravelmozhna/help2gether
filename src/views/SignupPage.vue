<template>
  <div class="container">
    <b-card
      bg-variant="light"
      class="w-50 mt-5 mr-auto ml-auto"
    >
      <h1 class="text-center title">Sign Up</h1>
      <b-form @submit.prevent="userRegistration">
        <b-form-group
          label="First name"
          label-for="firstName"
        >
          <b-form-input
            id="firstName"
            type="text"
            v-model="user.firstName"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          label="Last name"
          label-for="lastName"
        >
          <b-form-input
            id="lastName"
            type="text"
            v-model="user.lastName"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          label="Phone"
          label-for="phone"
        >
          <b-form-input
            id="phone"
            type="text"
            v-model="user.phone"
          >
          </b-form-input>
        </b-form-group>
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
        </b-form-group>
        <b-button
          type="submit"
          class="w-100 mb-2"
          size="lg"
          variant="dark"
        >
          Sign Up
        </b-button>
        <p class="mb-0 text-right">
          Already registered?
          <router-link to="/login">Log in!</router-link>
        </p>
        </b-form>
      </b-card>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '@/firebase';

export default {
  name: 'SignupPage',
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    userRegistration() {
      createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then(() => {
          const db = getDatabase();
          const userId = auth.currentUser.uid;
          const usersListRef = ref(db, 'users/' + userId);
          set(usersListRef, {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            phone: this.user.phone,
            email: this.user.email,
          });
        })
        .then(() => {
          sendEmailVerification(auth.currentUser);

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
