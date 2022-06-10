<template>
  <div class="container">

    <GoBackButton />

    <b-list-group
      flush
      tag="ul">
      <b-list-group-item tag="li" class="border-0">
        <div class="mb-2">
          <span class="text mr-2 font-weight-bold">NAME:</span>
          <!-- <span>{{userData.firstName}} {{userData.lastName}}</span> -->
          <b-form-input
            :value="`${userData.firstName} ${userData.lastName}`"
            :disabled="!editPhase"
            class="bg-transparent w-50 text-dark"
          ></b-form-input>
        </div>
      </b-list-group-item>
      <b-list-group-item tag="li" class="border-0">
        <div class="mb-2">
          <span class="text mr-2 font-weight-bold">PHONE:</span>
          <!-- <span>{{userData.phone}}</span> -->
          <b-form-input
            :value="userData.phone"
            :disabled="!editPhase"
            class="bg-transparent w-50 text-dark"
          ></b-form-input>
        </div>
      </b-list-group-item>
      <b-list-group-item
        v-if="isItProfileOfCurrentLoggedUser && !editPhase"
        key="profile-of-current-logged-user"
        tag="li"
        >
        <b-button
          class="mt-2"
          variant="info"
          @click="editUserData"
          >Edit your profile</b-button>
      </b-list-group-item>
      <b-list-group-item
        v-if="isItProfileOfCurrentLoggedUser && editPhase"
        key="profile-of-current-logged-user"
        tag="li"
        >
        <b-button
          class="mt-2"
          variant="info"
          @click="saveNewUserData"
          >Save</b-button>
      </b-list-group-item>
    </b-list-group>
  </div>
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
      userData: {},
      isItProfileOfCurrentLoggedUser: false,
      editPhase: false,
    };
  },
  created() {
    const db = getDatabase();
    get(child(ref(db), `users/${this.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          this.userData = userData;

          const { currentUser } = auth;
          if (this.id === currentUser.uid) {
            this.isItProfileOfCurrentLoggedUser = true;
          }
        };
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    editUserData() {
      console.log('edit profile');
      this.editPhase = true;
    },
    saveNewUserData() {
      this.editPhase = false;
      this.$toast.success('Your profile was updated!', {
        timeout: 2500,
      });
    },
  },
};
</script>
