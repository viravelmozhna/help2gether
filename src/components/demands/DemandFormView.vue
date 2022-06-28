<template>
  <DemandFormData
    :mode="mode"
    v-on:formSubmit="formSubmit"
    :category="demandData.category"
    :demand="demandData.demand"
    :emergency="demandData.emergency"
    :name="demandData.contactData.name"
    :phone="demandData.contactData.phone"
    :region="demandData.contactData.address.region.split(' ')[0]"
    :city="demandData.contactData.address.city"
    :street="demandData.contactData.address.street"/>
</template>

<script>
import { getDatabase, ref, update, set, push, get, child } from 'firebase/database';
import DemandFormData from './DemandFormData.vue';
import getCurrentDate from '@/utils/getCurrentDate';
import { modes } from '@/env/constants';

const db = getDatabase();

export default {
  name: 'DemandFormView',
  components: {
    DemandFormData,
  },
  data() {
    return {
      id: this.$route.params.id,
      modes: modes,
      demandData: {
        category: '',
        demand: '',
        emergency: '',
        contactData: {
          name: '',
          phone: '',
          address: {
            city: '',
            region: '',
            street: '',
          },
        },
      },
    };
  },
  computed: {
    mode() {
      return this.id ? modes.EDIT : modes.ADD;
    },
  },
  created() {
    if (this.id) {
      get(child(ref(db), `demands/${this.id}`))
        .then((snapshot) => {
          this.demandData = snapshot.val();
        })
        .catch((error) => {
          console.log(error.code);
          this.$toast.error('Something went wrong! Try again later!', {
            timeout: 2500,
          });
          this.$router.go(-1);
        });
    }
  },
  methods: {
    formSubmit(e) {
      if (this.mode === modes.EDIT) {
        this.updateDemand(e);
        this.$router.go(-1);
      } else if (this.mode === modes.ADD) {
        const demandListRef = ref(db, 'demands');
        const newDemandRef = push(demandListRef);
        this.addDemand(e, newDemandRef);
      };
    },
    updateDemand(e) {
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
    },
    addDemand(e, demandRef) {
      set(demandRef, {
        contactData: {
          name: e.name,
          phone: e.phone,
          address: e.address,
          // address: {
          //   region: e.region,
          //   city: e.city,
          //   street: e.street,
          // },
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
          this.$router.push({ path: `/demands/detailed/${demandRef.key}` });
        })
        .catch(() => {
          this.$toast.error('Sorry, something went wrong! Try again later!', {
            timeout: 2500,
          });
          this.$router.push({ path: '/demands/list' });
        });
    },
  },
};
</script>
