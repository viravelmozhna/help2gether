<template>
  <b-container fluid>
    <b-row cols="1" cols-sm="3" cols-md="5" cols-lg="6" tag="ul" no-gutters class="p-0 mw-100" align-h="center">
      <template v-for="item in items">
        <DemandItem
          :status="item.status"
          :emergency="item.emergency"
          :categorie="item.categorie"
          :city="item.data.address.city"
          :demand="item.data.demand"
          :time="item.time"
          :key="item.id"
        />
      </template>
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
