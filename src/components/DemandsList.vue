<template>
  <b-container fluid>
    <b-row cols="1" cols-sm="3" cols-md="5" cols-lg="6" tag="ul" no-gutters class="p-0 mw-100" align-h="center">
      <b-card v-for="item in items" :key="item.id" align="left" tag="li" class="m-2 item">
        <DemandItem :item="item" />
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import DemandItem from './DemandItem.vue';
export default {
  data() {
    return {
      items: this.$store.state.demands,
    };
  },
  components: {
    DemandItem,
  },
};
</script>

<style scope>
.item:hover {
  transform: scale(1.02);
  border-color: #325892;
  cursor: pointer;
}
</style>
