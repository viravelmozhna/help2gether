<template>
  <div>
    <b-button @click="goBack" size="sm" variant="link">Go back to the list</b-button>
    <h1>Detailed info about demand -- {{ id }}</h1>
    <p>NAME: {{demandInfo.contactData.name}}</p>
    <p>PHONE: {{demandInfo.contactData.phone}}</p>
    <p>ADDRESS: {{demandInfo.contactData.address.region}} region, {{demandInfo.contactData.address.city}}, {{demandInfo.contactData.address.street}}</p>
    <p>DEMAND: {{demandInfo.demand}}</p>
    <p><b-badge variant="success" v-if="demandInfo.status === 'active'">Active</b-badge>
    <b-badge variant="info" v-else-if="demandInfo.status === 'in progress'">In progress</b-badge>
    <b-badge variant="light" v-else>Completed</b-badge>
    <b-badge variant="danger" v-if="demandInfo.emergency === 'urgent' && demandInfo.status === 'active'">Urgent</b-badge></p>
    <b-badge variant="secondary">{{demandInfo.category}}</b-badge>
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
      this.$router.push({ path: this.from });
    },
  },
  mounted() {
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
