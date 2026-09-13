<template>
  <DemandFormData
    v-on:formSubmit="formSubmit"
    :mode="mode"
    :category="demandData.category"
    :demand="demandData.demand"
    :emergency="demandData.emergency"
    :name="demandData.contactData.name"
    :phone="demandData.contactData.phone"
    :formattedAddress="demandData.contactData.address.formattedAddress"
    :coords="demandData.contactData.address.coords"
    :city="demandData.contactData.address.city"
  />
</template>

<script>
import {
  getDatabase,
  ref,
  update,
  set,
  push,
  get,
  child,
} from 'firebase/database';
import DemandFormData from './DemandFormData.vue';
import getCurrentDate from '@/utils/getCurrentDate';
import syncPublicDemand from '@/utils/syncPublicDemand';
import canEditDemand, { isAdmin } from '@/utils/canEditDemand';
import { auth } from '@/firebase';
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
            formattedAddress: '',
            coords: null,
            city: '',
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
      const uid = auth.currentUser && auth.currentUser.uid;
      Promise.all([get(child(ref(db), `demands/${this.id}`)), isAdmin(uid)])
        .then(([snapshot, userIsAdmin]) => {
          const demand = snapshot.val();
          if (!canEditDemand(demand, uid, userIsAdmin)) {
            this.$toast.warning('Only the creator of this demand can edit it.', {
              timeout: 3000,
            });
            this.$router.replace({ path: `/demands/detailed/${this.id}` });
            return;
          }
          this.demandData = demand;
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
      }
    },
    updateDemand(e) {
      const payload = {
        category: e.category,
        demand: e.demand,
        emergency: e.emergency,
        contactData: {
          name: e.name,
          phone: e.phone,
          address: {
            city: e.city,
            coords: e.coords,
            formattedAddress: e.formattedAddress,
          },
        },
      };

      update(ref(db, 'demands/' + this.id), payload)
        .then(() => {
          return syncPublicDemand(this.id);
        })
        .then(() => {
          this.$toast.success('The demand was updated!', {
            timeout: 2500,
          });
        })
        .catch(() => {
          this.$toast.error('Something went wrong! Try again later!', {
            timeout: 2500,
          });
        });
    },
    addDemand(e, demandRef) {
      const payload = {
        contactData: {
          name: e.name,
          phone: e.phone,
          address: {
            city: e.city,
            coords: e.coords,
            formattedAddress: e.formattedAddress,
          },
        },
        demand: e.demand,
        category: e.category,
        createdTime: getCurrentDate(),
        createdAt: Date.now(),
        createdBy: auth.currentUser.uid,
        status: 'active',
        emergency: e.emergency,
      };

      set(demandRef, payload)
        .then(() => {
          return syncPublicDemand(demandRef.key, payload);
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
