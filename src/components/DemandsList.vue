<template>
  <b-container fluid>
    <b-row cols="1" cols-sm="3" cols-md="5" cols-lg="6" tag="ul" no-gutters class="p-0 mw-100" align-h="center">
      <b-card v-for="value in object" :key="value.name" align="left" tag="li" class="m-2 item">
        <DemandItem :item="value" />
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import { getDatabase, ref, onValue } from 'firebase/database';
import DemandItem from './DemandItem.vue';

export default {
  computed: {
    object() {
      return this.$store.state.demands;
    },
  },
  mounted() {
    const db = getDatabase();
    const demands = ref(db, 'demands');
    onValue(demands, (snapshot) => {
      const data = snapshot.val();
      console.log(data['id-1']);
      this.$store.commit('getData', data);
    });
  },
  components: {
    DemandItem,
  },
};
</script>

<style>
.item:hover {
  transform: scale(1.02);
  border-color: #325892;
  cursor: pointer;
}
</style>
