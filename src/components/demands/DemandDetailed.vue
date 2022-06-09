<template>
  <div class="container">
    <GoBackButton />
    <b-list-group
      flush
      tag="ul">
      <b-list-group-item tag="li">
        <div class="mb-2">
          <span class="text mr-2 font-weight-bold">NAME:</span>
          <span>{{demandInfo.contactData.name}}</span>
        </div>
      </b-list-group-item>
      <b-list-group-item tag="li">
        <div class="mb-2">
          <span class="text mr-2 font-weight-bold">PHONE:</span>
          <span>{{demandInfo.contactData.phone}}</span>
        </div>
      </b-list-group-item>
      <b-list-group-item tag="li">
        <div class="mb-2">
          <span class="text mr-2 font-weight-bold">ADDRESS:</span>
          <span>{{demandInfo.contactData.address.region}}, {{demandInfo.contactData.address.city}}, {{demandInfo.contactData.address.street}}</span>
        </div>
      </b-list-group-item>
      <b-list-group-item tag="li">
        <div class="mb-2">
          <span class="text mr-2 font-weight-bold">DEMAND:</span>
          <span>{{demandInfo.demand}}</span>
          <div>
            <b-badge
              pill
              variant="secondary"
            >
            {{demandInfo.category.toUpperCase()}}
            </b-badge>
          </div>
        </div>
      </b-list-group-item>
      <b-list-group-item tag="li" >
        <div>
          <span><i>The demand was created on {{demandInfo.createdTime}}</i></span>
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
      </b-list-group-item>
      <b-list-group-item tag="li" v-if="demandInfo.assignedTo">
        <span>The demand assigned to: {{assigneeName}}</span>
      </b-list-group-item>
      <b-list-group-item tag="li" v-if="!demandInfo.assignedTo">
        <b-button
          class="mt-3"
          variant="info"
          @click="assignDemand"
          >Take demand</b-button>
      </b-list-group-item>
      <b-list-group-item tag="li" v-else-if="demandInfo.status !== 'completed' && isCurrentUserAnAssignee">
        <b-button
          class="mt-3 mr-3"
          variant="success"
          @click="markAsComplete"
          >Mark as completed</b-button>
          <b-button
          class="mt-3"
          variant="danger"
          @click="unassignDemand"
          >Unassign demand</b-button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { getDatabase, ref, onValue, update, get, child } from 'firebase/database';
import { auth } from '@/firebase';
import GoBackButton from '../common/GoBackButton.vue';

export default {
  name: 'DemandDetailed',
  components: {
    GoBackButton,
  },
  data() {
    return {
      id: this.$route.params.id,
      assigneeName: '',
      isCurrentUserAnAssignee: false,
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
                this.isCurrentUserAnAssignee = true;
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
    markAsComplete() {
      const db = getDatabase();
      update(ref(db, 'demands/' + this.id), {
        status: 'completed',
      });
    },
    unassignDemand() {
      const db = getDatabase();
      update(ref(db, 'demands/' + this.id), {
        assignedTo: null,
        status: 'active',
      });
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 20px;
}
</style>
