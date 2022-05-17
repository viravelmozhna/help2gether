<template>
  <div>
    <b-badge class="badge" variant="success" v-if="value.status === 'active'">Active</b-badge>
        <b-badge class="badge" variant="info" v-else-if="value.status === 'in progress'">In progress</b-badge>
        <b-badge class="badge" variant="light" v-else>Completed</b-badge>
        <b-badge class="badge badge--urgent" variant="danger" v-if="value.emergency === 'urgent' && value.status === 'active'">Urgent</b-badge>
        <b-card-text class="font-weight-bold text-uppercase text m-0">{{ value.contactData.address.city }}</b-card-text>
        <b-card-text class="text-uppercase">{{ value.category }}</b-card-text>
        <b-card-text>{{ value.demand }}</b-card-text>
        <b-card-text class="time">{{ value.createdTime }}</b-card-text>
  </div>
</template>

<script>
export default {
  name: 'DemandItem',
  props: {
    value: Object,
  },
};
</script>

<style>
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
