<template>
  <UserFormData
    :mode="mode"
    :userFirstName="userData.firstName"
    :userLastName="userData.lastName"
    :userPhone="userData.phone"
    v-on:formSubmit="formSubmit"
  />
</template>

<script>
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { getDatabase, ref, set, get, child } from 'firebase/database';
import { auth } from '@/firebase';
import UserFormData from './UserFormData.vue';
import { modes, errors } from '@/env/constants';

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
      return this.isUserLoggedIn ? modes.EDIT : modes.ADD;
    },
  },
  created() {
    if (this.mode === modes.EDIT) {
      get(child(ref(db), `users/${this.currentUserData.id}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.userData = {
              firstName: '',
              lastName: '',
              phone: '',
              ...snapshot.val(),
            };
          }
        })
        .catch((error) => {
          console.log(error.code);
          this.$toast.error('Something went wrong! Try again later!', {
            timeout: 2500,
          });
          this.$router.go(-1);
        });
    }
  },
  methods: {
    formSubmit(e) {
      if (this.mode === modes.EDIT) {
        const profileData = {
          firstName: e.firstName,
          lastName: e.lastName,
          phone: e.phone,
          email:
            (auth.currentUser && auth.currentUser.email) || this.currentUserData.email || '',
        };

        // set() creates the profile if Auth user has no RTDB record yet
        set(ref(db, 'users/' + this.currentUserData.id), profileData)
          .then(() => {
            this.$toast.success('Your profile was updated!', {
              timeout: 2500,
            });
            this.$router.push(`/user/profile/${this.currentUserData.id}`);
          })
          .catch((error) => {
            console.log(error.code);
            this.$toast.error('Something went wrong! Try again later!', {
              timeout: 2500,
            });
          });
      } else {
        createUserWithEmailAndPassword(auth, e.email, e.password)
          .then((credential) => {
            const userId = credential.user.uid;
            return set(ref(db, 'users/' + userId), {
              firstName: e.firstName,
              lastName: e.lastName,
              phone: e.phone,
              email: e.email,
            }).then(() => {
              return credential.user;
            });
          })
          .then((user) => {
            return sendEmailVerification(user).then(() => {
              this.$toast.success('You was successfully registered!', {
                timeout: 2500,
              });
              this.$router.push('/demands/list');
            });
          })
          .catch((error) => {
            let errorMessage = 'Sorry, something went wrong! Try again later!';
            if (error.code === errors.EMAIL_ALREADY_IN_USE) {
              errorMessage = 'This email is already in use!';
            } else if (error.code === errors.INVALID_EMAIL) {
              errorMessage = 'Invalid email!';
            }
            this.$toast.error(errorMessage, {
              timeout: 2500,
            });
          });
      }
    },
  },
};
</script>
