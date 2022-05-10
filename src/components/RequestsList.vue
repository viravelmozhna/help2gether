<template>
  <b-container fluid>
    <b-row cols="2" cols-sm="3" cols-md="5" cols-lg="6" tag="ul" no-gutters class="p-0" align-h="center">
      <b-card v-for="item in items" :key="item.id" align="left" tag="li" class="m-2 item">
        <b-badge variant="danger" v-if="item.emergency === 'urgent' && item.status !== 'completed'">Urgent</b-badge>
        <b-card-text class="font-weight-bold text-uppercase text">{{ item.data.address.city }}</b-card-text>
        <b-card-text>{{ item.data.request }}</b-card-text>
        <b-card-text>{{ item.categorie }}</b-card-text>
        <b-card-text>{{ item.status }}</b-card-text>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import requestsList from '../assets/requestsList';

export default {
  name: 'RequestsList',
  data() {
    return {
      items: requestsList,
    };
  },
};
</script>

<style>
.item:hover {
  cursor: pointer;
  transform: scale(1.02);
  border-color: #325892;
}
.text {
  font-size: 20px;
}
</style>
