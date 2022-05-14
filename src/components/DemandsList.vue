<template>
  <b-container fluid>
    <b-row cols="1" cols-sm="3" cols-md="5" cols-lg="6" tag="ul" no-gutters class="p-0 mw-100" align-h="center">
      <b-card v-for="item in items" :key="item.id" align="left" tag="li" class="m-2 item">
        <b-badge class="badge" variant="success" v-if="item.status === 'active'">Active</b-badge>
        <b-badge class="badge" variant="info" v-else-if="item.status === 'in progress'">In progress</b-badge>
        <b-badge class="badge" variant="light" v-else>Completed</b-badge>
        <b-badge class="badge badge--urgent" variant="danger" v-if="item.emergency === 'urgent' && item.status === 'active'">Urgent</b-badge>
        <b-card-text class="font-weight-bold text-uppercase text m-0">{{ item.data.address.city }}</b-card-text>
        <b-card-text class="text-uppercase">{{ item.categorie }}</b-card-text>
        <b-card-text>{{ item.data.demand }}</b-card-text>
        <b-card-text class="time">{{ item.time }}</b-card-text>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      items: this.$store.state.demands,
    };
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
