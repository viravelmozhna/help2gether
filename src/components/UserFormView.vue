<template>
  <UserFormData
    :mode="mode"
    :userFirstName="userData.firstName"
    :userLastName="userData.lastName"
    :userPhone="userData.phone"
    v-on:formSubmit="formSubmit"/>
</template>

<script>
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getDatabase, ref, update, set, get, child } from 'firebase/database';
import { auth } from '@/firebase';
import UserFormData from './UserFormData.vue';

const db = getDatabase();

export default {
  name: 'UserFormView',
  components: {
    UserFormData,
  },
  data() {
    return {
      userData: {
        firstName: '',
        lastName: '',
        phone: '',
      },
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    currentUserData() {
      return this.$store.getters.userData;
    },
    mode() {
      return this.isUserLoggedIn ? 'edit' : 'add';
    },
  },
  created() {
    if (this.mode === 'edit') {
      get(child(ref(db), `users/${this.currentUserData.id}`))
        .then((snapshot) => {
          this.userData = snapshot.val();
        })
        .catch((error) => {
          console.log(error.code);
          this.$toast.error('Something went wrong! Try again later!', {
            timeout: 2500,
          });
          this.$router.go(-1);
        });
    };
  },
  methods: {
    formSubmit(e) {
      if (this.mode === 'edit') {
        update(ref(db, 'users/' + this.currentUserData.id), {
          firstName: e.firstName,
          lastName: e.lastName,
          phone: e.phone,
        })
          .then(() => {
            this.$toast.success('Your profile was updated!', {
              timeout: 2500,
            });
          })
          .catch((error) => {
            console.log(error.code);
            this.$toast.error('Something went wrong! Try again later!', {
              timeout: 2500,
            });
          });
        this.$router.go(-1);
      } else {
        createUserWithEmailAndPassword(auth, e.email, e.password)
          .then(() => {
            const userId = auth.currentUser.uid;
            const userRef = ref(db, 'users/' + userId);
            set(userRef, {
              firstName: e.firstName,
              lastName: e.lastName,
              phone: e.phone,
              email: e.email,
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
            let errorMessage = 'Sorry, something went wrong! Try again later!';
            if (error.code === 'auth/email-already-in-use') {
              errorMessage = 'This email is already in use!';
            } else if (error.code === 'auth/invalid-email') {
              errorMessage = 'Invalid email!';
            }
            this.$toast.error(errorMessage, {
              timeout: 2500,
            });
            console.log(error.code);
          });
      }
    },
  },
};
</script>
