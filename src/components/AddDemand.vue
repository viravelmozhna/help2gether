<template>
  <div class="container">
    Hello test
    <button @click="addDemand">
      add demand
    </button>
  </div>
</template>

<script>
import { getDatabase, ref, set } from 'firebase/database';
import shortid from 'shortid';

export default {
  name: 'AddDemand',
  methods: {
    addDemand() {
      const db = getDatabase();
      const demandId = shortid.generate();
      const currentTime = Date.now();
      console.log(currentTime);
      set(ref(db, 'demands/' + demandId), {
        contactData: {
          name: 'test',
          phone: '123',
          address: {
            region: 'aaa',
            city: 'aaa',
            street: 'aaa',
          },
        },
        demand: 'aaa',
        category: 'food',
        createdTime: currentTime,
        status: 'active',
        emergency: 'urgent',
      });
    },
  },
};
</script>
