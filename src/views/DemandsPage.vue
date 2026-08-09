<template>
  <div>
    <NavBar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import { getDatabase, ref, onValue } from 'firebase/database';
import { getCurrentUser } from '@/firebase';
import NavBar from '@/components/common/NavBar.vue';
import syncPublicDemand from '@/utils/syncPublicDemand';

export default {
  name: 'DemandsPage',
  components: {
    NavBar,
  },
  data() {
    return {
      unsubscribe: null,
      demands: [],
      cities: [],
      authReady: false,
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
  watch: {
    isUserLoggedIn() {
      if (this.authReady) {
        this.subscribeToDemands();
      }
    },
  },
  async created() {
    this.$store.dispatch('deleteAllFilters');
    await getCurrentUser();
    this.authReady = true;
    this.subscribeToDemands();
  },
  beforeDestroy() {
    this.teardownSubscription();
  },
  methods: {
    teardownSubscription() {
      if (this.unsubscribe) {
        this.unsubscribe();
        this.unsubscribe = null;
      }
    },
    subscribeToDemands() {
      this.teardownSubscription();

      const db = getDatabase();
      // Guests read the sanitized public mirror; logged-in users get full demands
      const sourcePath = this.isUserLoggedIn ? 'demands' : 'publicDemands';
      const sourceDemands = ref(db, sourcePath);

      this.unsubscribe = onValue(sourceDemands, (snapshot) => {
        const dataSnapshot = snapshot.val();
        this.demands = [];
        this.cities = [];

        if (dataSnapshot) {
          this.demands = Object.entries(dataSnapshot);

          this.demands.forEach((item) => {
            const address = item[1] && item[1].contactData && item[1].contactData.address;
            const city = address && address.city;
            if (city && !this.cities.includes(city)) {
              this.cities.push(city);
            }

            if (this.isUserLoggedIn) {
              syncPublicDemand(item[0], item[1]).catch((error) => {
                console.log(error);
              });
            }
          });
        }

        this.$store.dispatch('setDemands', {
          data: this.demands,
        });
        this.$store.dispatch('setCities', {
          data: this.cities,
        });
      });
    },
  },
};
</script>
