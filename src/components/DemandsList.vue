<template>
  <b-container fluid>
    <b-row cols="1" cols-sm="3" cols-md="5" cols-lg="6" tag="ul" no-gutters class="p-0 mw-100" align-h="center">
      <b-card v-for="value in object" :key="value.name" align="left" tag="li" class="m-2 item">
        <b-badge class="badge" variant="success" v-if="value.status === 'active'">Active</b-badge>
        <b-badge class="badge" variant="info" v-else-if="value.status === 'in progress'">In progress</b-badge>
        <b-badge class="badge" variant="light" v-else>Completed</b-badge>
        <b-badge class="badge badge--urgent" variant="danger" v-if="value.emergency === 'urgent' && value.status === 'active'">Urgent</b-badge>
        <b-card-text class="font-weight-bold text-uppercase text m-0">{{ value.contactData.address.city }}</b-card-text>
        <b-card-text class="text-uppercase">{{ value.category }}</b-card-text>
        <b-card-text>{{ value.demand }}</b-card-text>
        <b-card-text class="time">{{ value.createdTime }}</b-card-text>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import { getDatabase, ref, onValue } from 'firebase/database';

export default {
  data() {
    return {
      object: this.$store.state.demands,
    };
  },
  mounted() {
    const db = getDatabase();
    const demands = ref(db, 'demands');
    onValue(demands, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      this.$store.commit('getData', data);
    });
  },
};
</script>

<style>
.item:hover {
  transform: scale(1.02);
  border-color: #325892;
  cursor: pointer;
}
.text {
  font-size: 20px;
}
.badge {
  position: absolute;
  top: 5px;
  right: 5px;
}
.badge--urgent {
  top: 25px;
}
.time {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 14px;
}
</style>
