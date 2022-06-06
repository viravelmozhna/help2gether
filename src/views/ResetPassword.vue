<template>
 <div class="container">
    <b-card
      bg-variant="light"
      class="w-50 mt-5 mr-auto ml-auto"
    >
      <h1 class="text-center title">Reset Password</h1>
      <b-form @submit.prevent="forgetPassword">
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
        <b-button
          type="submit"
          class="w-100 mb-2"
          size="lg"
          variant="dark"
        >
          Reset Password
        </b-button>
      </b-form>
    </b-card>
    </div>
</template>

<script>
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase';
export default {
  name: 'ResetPassword',
  data() {
    return {
      user: {
        email: '',
      },
    };
  },
  methods: {
    forgetPassword() {
      sendPasswordResetEmail(auth, this.user.email)
        .then(() => {
          this.$toast.info('Check your registered email to reset the password!', {
            timeout: 3500,
          });
          this.user = {
            email: '',
          };
          this.$router.push('/login');
        }).catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
