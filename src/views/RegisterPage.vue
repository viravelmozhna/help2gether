<template>
  <div class="container">
        <b-form
          @submit.prevent="userRegistration"
          class="w-50 mt-5"
        >
            <h3>Sign Up</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control form-control-lg" v-model="user.name" />
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">
               Sign Up
            </button>
            <p class="forgot-password text-right">
                Already registered
                <router-link :to="{name: 'login'}">sign in?</router-link>
            </p>
        </b-form>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
export default {
  name: 'LoginPage',
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
        // Signed in
          const { user } = userCredential;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });

    //  firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(this.user.email, this.user.password)
    //     .then((res) => {
    //       res.user.updateProfile({
    //           displayName: this.user.name,
    //         })
    //         .then(() => {
    //           this.$router.push('/login');
    //         });
    //     })
    //     .catch((error) => {
    //       alert(error.message);
    //     });
    },
  },
};
</script>
