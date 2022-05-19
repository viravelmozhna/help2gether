<template>
  <b-card
    @click="demandDetailedInfoPageOpenHandler(id)"
    align="left"
    tag="li"
    class="m-2 item"
  >
    <b-badge
      v-if="status === 'active'"
      key="status-active"
      class="badge"
      variant="success"
    >
      Active
    </b-badge>
    <b-badge
      v-else-if="status === 'in progress'"
      key="status-in-progress"
      class="badge"
      variant="info"
    >
      In progress
    </b-badge>
    <b-badge
      v-else
      key="status-completed"
      class="badge"
      variant="light"
    >
      Completed
    </b-badge>
    <b-badge
      v-if="emergency === 'urgent' && status === 'active'"
      key="demand-emergency"
      class="badge badge--urgent"
      variant="danger"
    >
      Urgent
    </b-badge>
    <b-card-text class="font-weight-bold text-uppercase text m-0">{{ city }}</b-card-text>
    <b-card-text class="text-uppercase">{{ category }}</b-card-text>
    <b-card-text>{{ demand }}</b-card-text>
    <b-card-text class="time">{{ createdTime }}</b-card-text>
  </b-card>
</template>

<script>
export default {
  name: 'DemandItem',
  props: {
    status: String,
    category: String,
    emergency: String,
    createdTime: String,
    city: String,
    demand: String,
    id: String,
  },
  methods: {
    demandDetailedInfoPageOpenHandler(id) {
      this.$router.push({ path: `/demands/detailed/${id}` });
    },
  },
};
</script>

<style scoped>
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
