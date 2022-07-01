<template>
  <div class="container mt-5">

    <GoBackButton v-if="mode === modes.EDIT"/>

    <b-card
      bg-variant="light"
      class="mt-2 mr-auto ml-auto user-data-form"
    >
      <h1 class="text-center title">
        <span>{{mode === modes.EDIT ? 'Edit profile' : 'Sign Up'}}</span>
      </h1>
      <b-form @submit.prevent="userDataFormHandler">
        <b-form-group
          label="First name"
          label-for="firstName"
        >
          <input
            id="firstName"
            type="text"
            class="form-control"
            required
            :value="userData.firstName"
            @change="e => userData.firstName = e.target.value"/>
        </b-form-group>
        <b-form-group
          label="Last name"
          label-for="lastName"
        >
          <input
            id="lastName"
            type="text"
            class="form-control"
            required
            :value="userData.lastName"
            @change="e => userData.lastName = e.target.value"/>
        </b-form-group>
        <b-form-group
          label="Phone"
          label-for="phone"
        >
          <input
            id="phone"
            type="text"
            class="form-control"
            required
            :value="userData.phone"
            @change="e => userData.phone = e.target.value"/>
        </b-form-group>
        <b-form-group
          v-if="mode !== modes.EDIT"
          label="Email"
          label-for="email"
        >
          <input
            id="email"
            type="email"
            class="form-control"
            required
            @change="e => userData.email = e.target.value"/>
        </b-form-group>
        <b-form-group
          v-if="mode !== modes.EDIT"
          label="Password (8 characters minimum)"
          label-for="password"
        >
          <input
            id="password"
            type="password"
            minlength="8"
            required
            class="form-control"
            @change="e => userData.password = e.target.value"/>
        </b-form-group>

        <b-button
          type="submit"
          class="w-100 mb-2"
          size="lg"
          variant="dark"
        >
          <span>{{mode === modes.EDIT ? 'Save changes' : 'Sign Up'}}</span>
        </b-button>

        <p
          v-if="mode !== modes.EDIT"
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
import GoBackButton from '@/components/common/GoBackButton.vue';
import { modes } from '@/env/constants';

export default {
  name: 'UserFormData',
  components: {
    GoBackButton,
  },
  data() {
    return {
      modes: modes,
    };
  },
  props: {
    mode: String,
    userFirstName: String,
    userLastName: String,
    userPhone: String,
  },
  computed: {
    userData() {
      return {
        firstName: this.userFirstName,
        lastName: this.userLastName,
        phone: this.userPhone,
        email: '',
        password: '',
      };
    },
  },
  methods: {
    userDataFormHandler() {
      const userData = {
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        phone: this.userData.phone,
        email: this.userData.email,
        password: this.userData.password,
      };
      this.$emit('formSubmit', userData);
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 30px;
}
.user-data-form {
  box-shadow: 7px 7px 29px -6px rgba(0,0,0,0.24);
}
@media screen and (max-width: 549px) {
  .user-data-form {
    width: 90vw;
  }
}
@media screen and (min-width: 550px) {
  .user-data-form {
    width: 400px;
  }
}
@media screen and (min-width: 900px) {
  .user-data-form {
    width: 450px;
  }
}
</style>
