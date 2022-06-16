<template>
  <DemandFormData :mode="mode" :demandId="id" v-on:formSubmit="formSubmit"/>
</template>

<script>
import { getDatabase, ref, update, set, push } from 'firebase/database';
import DemandFormData from './DemandFormData.vue';
import getCurrentDate from '@/utils/getCurrentDate';

const db = getDatabase();

export default {
  name: 'DemandFormView',
  components: {
    DemandFormData,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    mode() {
      return this.id ? 'edit' : 'add';
    },
  },
  methods: {
    formSubmit(e) {
      if (this.mode === 'edit') {
        update(ref(db, 'demands/' + this.id), {
          category: e.category,
          demand: e.demand,
          emergency: e.emergency,
          contactData: {
            name: e.name,
            phone: e.phone,
            address: {
              city: e.city,
              region: e.region,
              street: e.street,
            },
          },
        })
          .then(() => {
            this.$toast.success('The demand was updated!', {
              timeout: 2500,
            });
          })
          .catch((error) => {
            console.log(error.code);
            this.$toast.error('Something went wrong! Try again later!', {
              timeout: 2500,
            });
          });
        this.$router.go(-1);
      } else {
        const demandListRef = ref(db, 'demands');
        const newDemandRef = push(demandListRef);

        set(newDemandRef, {
          contactData: {
            name: e.name,
            phone: e.phone,
            address: {
              region: e.region,
              city: e.city,
              street: e.street,
            },
          },
          demand: e.demand,
          category: e.category,
          createdTime: getCurrentDate(),
          status: 'active',
          emergency: e.emergency,
        })
          .then(() => {
            this.$toast.success('The demand was added!', {
              timeout: 2500,
            });
            this.$router.push({ path: `/demands/detailed/${newDemandRef.key}` });
          })
          .catch(() => {
            this.$toast.error('Sorry, something went wrong! Try again later!', {
              timeout: 2500,
            });
            this.$router.push({ path: '/demands/list' });
          });
      }
    },
  },
};
</script>
