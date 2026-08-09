<template>
  <b-container
    class="d-flex flex-column justify-content-center position-relative"
  >
    <GoBackButton />

    <b-card
      header-bg-variant="dark"
      header-text-variant="white"
      header="USER INFO"
      class="ml-auto mr-auto user-profile-card"
    >
      <b-button
        v-if="isItProfileOfCurrentLoggedUser"
        key="profile-of-current-logged-user"
        class="mt-2 position-absolute edit-button"
        variant="light"
        size="sm"
        @click="editUserProfile"
      >
        Edit
      </b-button>

      <b-card-text class="mb-3">
        <span class="mr-2 label font-weight-bold">First name:</span>
        <span>{{ userData.firstName }}</span>
      </b-card-text>
      <b-card-text class="mb-3">
        <span class="mr-2 label font-weight-bold">Last name:</span>
        <span>{{ userData.lastName }}</span>
      </b-card-text>
      <b-card-text>
        <span class="mr-2 label font-weight-bold">Phone:</span>
        <span>{{ userData.phone }}</span>
      </b-card-text>
      <b-card-text>
        <span class="mr-2 label font-weight-bold">Email:</span>
        <span>{{ userData.email }}</span>
      </b-card-text>
    </b-card>
  </b-container>
</template>

<script>
import { getDatabase, ref, get, child } from 'firebase/database';
import { auth } from '@/firebase';
import GoBackButton from '@/components/common/GoBackButton.vue';

export default {
  name: 'UserProfile',
  components: {
    GoBackButton,
  },
  data() {
    return {
      id: this.$route.params.id,
      userData: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
      },
      isItProfileOfCurrentLoggedUser: false,
    };
  },
  created() {
    const { currentUser } = auth;
    this.isItProfileOfCurrentLoggedUser = Boolean(
      currentUser && this.id === currentUser.uid,
    );

    if (this.isItProfileOfCurrentLoggedUser && currentUser.email) {
      this.userData.email = currentUser.email;
    }

    const db = getDatabase();
    get(child(ref(db), `users/${this.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.userData = {
            firstName: '',
            lastName: '',
            phone: '',
            email: this.userData.email,
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
  },
  methods: {
    editUserProfile() {
      this.$router.push('/user/edit');
    },
  },
};
</script>

<style scoped>
.label {
  width: 200px;
}
.edit-button {
  top: 1px;
  right: 10px;
}
.user-profile-card {
  box-shadow: 7px 7px 29px -6px rgba(0, 0, 0, 0.24);
}
@media screen and (max-width: 549px) {
  .user-profile-card {
    width: 90vw;
  }
}
@media screen and (min-width: 550px) {
  .user-profile-card {
    width: 400px;
  }
}
@media screen and (min-width: 900px) {
  .user-profile-card {
    width: 450px;
  }
}
</style>
