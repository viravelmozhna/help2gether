<template>
  <div class="container">
    <b-button
      @click="goBack"
      size="sm"
      variant="link"
      class="mb-2"
    >
      <u>Go back to the list</u>
    </b-button>
    <b-list-group
      flush
      tag="ul">
      <b-list-group-item tag="li">
        <div class="mb-2">
          <span class="text mr-2">NAME:</span>
          <span>{{demandInfo.contactData.name}}</span>
        </div>
      </b-list-group-item>
      <b-list-group-item tag="li">
        <div class="mb-2">
          <span class="text mr-2">PHONE:</span>
          <span>{{demandInfo.contactData.phone}}</span>
        </div>
      </b-list-group-item>
      <b-list-group-item tag="li">
        <div class="mb-2">
          <span class="text mr-2">ADDRESS:</span>
          <span>{{demandInfo.contactData.address.region}} region, {{demandInfo.contactData.address.city}}, {{demandInfo.contactData.address.street}}</span>
        </div>
      </b-list-group-item>
      <b-list-group-item tag="li">
        <div class="mb-2">
          <span class="text mr-2">DEMAND:</span>
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
    </b-list-group>
  </div>
</template>

<script>
import { getDatabase, ref, onValue } from 'firebase/database';

export default {
  name: 'DemandDetailedInfoPage',
  data() {
    return {
      id: this.$route.params.id,
      from: null,
    };
  },
  computed: {
    demandInfo() {
      return this.$store.state.demandInfo;
    },
  },
  methods: {
    goBack() {
      const path = this.from === null ? '/' : this.from;
      this.$router.push({ path });
    },
  },
  created() {
    const db = getDatabase();
    const demandInfo = ref(db, 'demands/' + this.id);
    onValue(demandInfo, (snapshot) => {
      const data = snapshot.val();
      this.$store.dispatch('getDemandInfo', {
        data,
      });
    });
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.from = from.path;
    });
  },
};
</script>

<style scoped>
.text {
  font-size: 20px;
}
</style>
