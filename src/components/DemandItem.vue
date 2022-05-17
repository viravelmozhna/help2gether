<template>
  <div>
    <b-badge class="badge" variant="success" v-if="item.status === 'active'">Active</b-badge>
    <b-badge class="badge" variant="info" v-else-if="item.status === 'in progress'">In progress</b-badge>
    <b-badge class="badge" variant="light" v-else>Completed</b-badge>
    <b-badge class="badge badge--urgent" variant="danger" v-if="item.emergency === 'urgent' && item.status === 'active'">Urgent</b-badge>
    <b-card-text class="font-weight-bold text-uppercase text m-0">{{ item.contactData.address.city }}</b-card-text>
    <b-card-text class="text-uppercase">{{ item.category }}</b-card-text>
    <b-card-text>{{ item.demand }}</b-card-text>
    <b-card-text class="time">{{ item.createdTime }}</b-card-text>
  </div>
</template>

<script>
export default {
  name: 'DemandItem',
  props: {
    item: Object,
  },
};
</script>

<style scoped>
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
