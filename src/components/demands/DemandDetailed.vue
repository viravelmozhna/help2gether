<template>
  <b-container class="d-flex flex-column justify-content-center position-relative">

    <GoBackButton />
    <ModalWindow title="Mark this demand as completed?" v-on:actionInModalWindow="actionInModalWindowHandler"/>

    <b-card
      header-bg-variant="dark"
      header="DEMAND INFO"
      header-text-variant="white"
      class="ml-auto mr-auto mb-5 demand-detailed-card">

      <b-button
        class="mb-3 position-absolute edit-button"
        variant="light"
        size="sm"
        @click="editDemand"
        >Edit</b-button>

      <b-card-text class="mb-3">
        <span class="mr-2 label font-weight-bold">Demand:</span>
        <span>{{demandInfo.demand}}</span>
        <div>
              <b-badge
                pill
                variant="secondary"
              >
              {{demandInfo.category.toUpperCase()}}
              </b-badge>
            </div>
      </b-card-text>

      <b-card-text class="mb-3">
        <span class="mr-2 label font-weight-bold">Name:</span>
        <span>{{demandInfo.contactData.name}}</span>
      </b-card-text>

      <b-card-text class="mb-3">
        <span class="mr-2 label font-weight-bold">Phone:</span>
        <span>{{demandInfo.contactData.phone}}</span>
      </b-card-text>

      <b-card-text class="mb-3">
        <span class="mr-2 label font-weight-bold">Address:</span>
        <span>{{demandInfo.contactData.address.formattedAddress}}</span>
      </b-card-text>

      <GoogleMap
        v-if="demandInfo.contactData.address.formattedAddress"
        :center="demandInfo.contactData.address.coords"
        :zoom="17">
          <GoogleMarker
            :marker="demandInfo.contactData.address.coords"
          />
      </GoogleMap>

      <b-card-text class="mb-3">
        <div>
          <span><i>The demand was created on {{demandInfo.createdTime}}</i></span><br>
          <span
            v-if="demandInfo.completedTime"
            key="completed-time"
            ><i>The demand was completed on {{demandInfo.completedTime}}</i>
          </span>
          <div>
            <span class="mr-2">
              <b-badge
                v-if="demandInfo.status === 'active'"
                key="status-active"
                pill
                variant="success"
              >
              ACTIVE
              </b-badge>
              <b-badge
                v-else-if="demandInfo.status === 'in progress'"
                key="status-in-progress"
                pill
                variant="info"
              >
              IN PROGRESS
              </b-badge>
              <b-badge
                v-else
                key="status-completed"
                pill
                variant="light"
              >
              COMPLETED
              </b-badge>
            </span>
            <b-badge
              v-if="demandInfo.emergency === 'urgent' && demandInfo.status === 'active'"
              key="demand-emergency"
              pill
              variant="danger"
            >
            URGENT
            </b-badge>
          </div>
        </div>
      </b-card-text>

      <b-card-text class="mb-3"
        v-if="demandInfo.assignedTo"
        key="demand-was-assigned"
        tag="li"
      >
        <span>
          <i>
            The demand
            <span
              v-if="demandInfo.completedTime"
              key="demand-is-completed-by-user"
            >
            was completed by
            </span>
            <span
              v-else
              key="demand-is-assigned-to-user"
            >
            assigned to
            </span>
            <a @click="goToUserProfile"><u class="link">{{assigneeName}}</u></a>
          </i>
        </span>
      </b-card-text>

      <b-button
        v-if="!demandInfo.assignedTo"
        key="demand-is-not-assigned-yet"
        class="mt-2"
        variant="info"
        @click="assignDemand"
        >Take demand</b-button>

      <div
        v-else-if="isCurrentLoggedUserAnAssignee && demandInfo.status !== 'completed'"
        key="demand-is-assigned-to-current-user"
        tag="li"
        >
        <b-button v-b-modal.modalWindow
          class="mt-2 mr-3"
          variant="success"
          >Mark as completed</b-button>
          <b-button
          class="mt-2"
          variant="danger"
          @click="unassignDemand"
          >Unassign demand</b-button>
      </div>

    </b-card>

  </b-container>
</template>

<script>
import { getDatabase, ref, onValue, update, get, child } from 'firebase/database';
import { auth } from '@/firebase';
import getCurrentDate from '@/utils/getCurrentDate';
import GoBackButton from '../common/GoBackButton.vue';
import ModalWindow from '../common/ModalWindow.vue';
import GoogleMarker from '../map/GoogleMarker.vue';
import GoogleMap from '../map/GoogleMap.vue';

export default {
  name: 'DemandDetailed',
  components: {
    GoBackButton,
    ModalWindow,
    GoogleMarker,
    GoogleMap,
  },
  data() {
    return {
      id: this.$route.params.id,
      assigneeName: '',
      isCurrentLoggedUserAnAssignee: false,
    };
  },
  computed: {
    demandInfo() {
      return this.$store.state.demandDetailedInfo;
    },
  },
  created() {
    const db = getDatabase();
    const demandInfo = ref(db, 'demands/' + this.id);
    onValue(demandInfo, (snapshot) => {
      const data = snapshot.val();
      this.$store.dispatch('setDemandDetailedInfo', {
        data,
      });
      if (data.assignedTo) {
        get(child(ref(db), `users/${this.demandInfo.assignedTo}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const { currentUser } = auth;
              if (this.demandInfo.assignedTo === currentUser.uid) {
                this.isCurrentLoggedUserAnAssignee = true;
              }

              const assignee = snapshot.val();
              this.assigneeName = `${assignee.firstName} ${assignee.lastName}`;
            };
          })
          .catch((error) => {
            console.error(error);
          });
      };
    });
  },
  methods: {
    assignDemand() {
      const { currentUser } = auth;
      const db = getDatabase();
      update(ref(db, 'demands/' + this.id), {
        assignedTo: currentUser.uid,
        status: 'in progress',
      });
    },
    unassignDemand() {
      const db = getDatabase();
      update(ref(db, 'demands/' + this.id), {
        assignedTo: null,
        status: 'active',
      });
    },
    actionInModalWindowHandler(e) {
      if (e === 'approve') {
        const db = getDatabase();
        update(ref(db, 'demands/' + this.id), {
          status: 'completed',
          completedTime: getCurrentDate(),
        });
      }
    },
    goToUserProfile() {
      this.$router.push({ path: `/user/profile/${this.demandInfo.assignedTo}` });
    },
    editDemand() {
      this.$router.push({ path: `/demands/edit/${this.id}` });
    },
  },
};
</script>

<style scoped>
.link {
  cursor: pointer;
  color: #325892;
}
.edit-button {
  top: 9px;
  right: 10px;
}
.demand-detailed-card {
  box-shadow: 7px 7px 29px -6px rgba(0,0,0,0.24);
}
@media screen and (max-width: 549px) {
  .demand-detailed-card {
    width: 90vw;
  }
}
@media screen and (min-width: 550px) {
  .demand-detailed-card {
    width: 400px;
  }
}
@media screen and (min-width: 900px) {
  .demand-detailed-card {
    width: 450px;
  }
}
</style>
