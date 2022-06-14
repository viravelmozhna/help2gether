<template>
  <div class="container">
    <b-card
      bg-variant="light"
      class="w-50 mt-5 mr-auto ml-auto"
    >
      <h1 class="text-center title">
        <span>{{mode === 'edit' ? 'Edit profile' : 'Sign Up'}}</span>
      </h1>
      <b-form @submit.prevent="userProfileEdit">
        <b-form-group
          label="First name"
          label-for="firstName"
        >
          <input
            id="firstName"
            type="text"
            class="form-control"
            :value="userData.firstName"
            @change="e => userUpdatedData.firstName = e.target.value"/>
        </b-form-group>
        <b-form-group
          label="Last name"
          label-for="lastName"
        >
          <input
            id="lastName"
            type="text"
            class="form-control"
            :value="userData.lastName"
            @change="e => userUpdatedData.lastName = e.target.value"/>
        </b-form-group>
        <b-form-group
          label="Phone"
          label-for="phone"
        >
          <input
            id="phone"
            type="text"
            class="form-control"
            :value="userData.phone"
            @change="e => userUpdatedData.phone = e.target.value"/>
        </b-form-group>
        <b-form-group
          label="Email"
          label-for="email"
        >
          <input
            id="email"
            type="email"
            class="form-control"
            :value="userData.email"
            @change="e => userUpdatedData.email = e.target.value"/>
        </b-form-group>
        <b-form-group
          v-if="mode !== 'edit'"
          label="Password"
          label-for="password"
        >
          <b-form-input
            id="password"
            type="password"
            class="form-control"
            @change="e => userUpdatedData.password = e.target.value"/>
        </b-form-group>

        <b-button
          type="submit"
          class="w-100 mb-2"
          size="lg"
          variant="dark"
        >
          <span>{{mode === 'edit' ? 'Save changes' : 'Sign Up'}}</span>
        </b-button>

        <p
          v-if="mode !== 'edit'"
          class="mb-0 text-right"
        >
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
  name: 'UserDataForm',
  data() {
    return {
      id: this.$route.params.userId,
      mode: this.$route.params.mode,
      userData: this.$route.params.userData || {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
      },
      userUpdatedData: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
      },
    };
  },
  created() {
    console.log('user data form');
  },
  methods: {
    userProfileEdit() {
      if (this.mode === 'edit') {
        console.log('edit mode');
      } else {
        createUserWithEmailAndPassword(auth, this.userUpdatedData.email, this.userUpdatedData.password)
          .then(() => {
            const db = getDatabase();
            const userId = auth.currentUser.uid;
            const usersListRef = ref(db, 'users/' + userId);
            set(usersListRef, {
              firstName: this.userUpdatedData.firstName,
              lastName: this.userUpdatedData.lastName,
              phone: this.userUpdatedData.phone,
              email: this.userUpdatedData.email,
            });
          })
          .then(() => {
            sendEmailVerification(auth.currentUser);
            this.$toast.success('You was successfully registered!', {
              timeout: 2500,
            });
            this.$router.push('/demands/list');
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 30px;
}
</style>
