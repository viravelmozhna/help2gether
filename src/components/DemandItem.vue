<template>
  <div>
    <b-badge
      v-if="item.status === 'active'"
      key="demand-status"
      class="badge"
      variant="success"
    >
      Active
    </b-badge>
    <b-badge
      v-else-if="item.status === 'in progress'"
      key="demand-status"
      class="badge"
      variant="info"
    >
      In progress
    </b-badge>
    <b-badge
      v-else
      key="demand-status"
      class="badge"
      variant="light"
    >
      Completed
    </b-badge>
    <b-badge
      v-if="item.emergency === 'urgent' && item.status === 'active'"
      key="demand-emergency"
      class="badge badge--urgent"
      variant="danger"
    >
      Urgent
    </b-badge>
    <b-card-text class="font-weight-bold text-uppercase text m-0">{{ item.data.address.city }}</b-card-text>
    <b-card-text class="text-uppercase">{{ item.categorie }}</b-card-text>
    <b-card-text>{{ item.data.demand }}</b-card-text>
    <b-card-text class="time">{{ item.time }}</b-card-text>
  </div>
</template>

<script>
export default {
  name: 'DemandItem',
  props: {
    item: {
      status: String,
      categorie: String,
      emergency: String,
      time: String,
      data: {
        address: {
          city: String,
        },
        demand: String,
      },
    },
  },
};
</script>

<style scope>
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
