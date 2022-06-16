<template>
  <div class="container mt-5">
    <p>{{mode === 'edit' ? 'Edit demand' : 'Add demand'}}</p>
    <p>{{mode}}</p>

    <!-- <GoBackButton v-if="mode === 'edit'"/>

    <b-card
      bg-variant="light"
      class="mt-2 mr-auto ml-auto user-data-form"
    >

      <h1 class="text-left title">
        <span>{{mode === 'edit' ? 'Edit demand' : 'Add demand'}}</span>
      </h1>

    <b-form @submit.prevent="demandDataFormHandler">

      <b-form-group
        label="Name"
        label-for="name"
      >
        <input
          id="name"
          type="text"
          class="form-control"
          required
          :value="userData.name"
          @change="e => userData.name = e.target.value"
          autocomplete="off"
        />
      </b-form-group>

      <b-form-group
        label="Phone"
        label-for="phone"
      >
        <input
          id="phone"
          type="tel"
          class="form-control"
          :value="userData.phone"
          @change="e => userData.phone = e.target.value"
          autocomplete="off"
          required
        />
      </b-form-group>

      <b-form-group
        label="Region"
      >
        <b-form-select
          :options="regions"
          v-model="selectedRegion"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        label="City"
        label-for="city"
      >
        <input
          id="city"
          type="text"
          autocomplete="off"
          class="form-control"
          required
          :value="userData.city"
          @change="e => userData.city = e.target.value"
        />
      </b-form-group>

      <b-form-group
        label="Street"
        label-for="street"
      >
        <input
          id="street"
          type="text"
          autocomplete="off"
          class="form-control"
          required
          :value="userData.street"
          @change="e => userData.street = e.target.value"
        />
      </b-form-group>

      <b-form-group
        label="Demand"
        label-for="demand"
      >
        <b-form-textarea
          id="demand"
          type="text"
          class="form-control"
          rows="3"
          required
          :value="userData.demand"
          @change="e => userData.demand = e.target.value"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="Category">
        <b-form-radio-group
          id="categories"
          v-model="category"
          :options="filterPropertiesValues.category"
          name="categories"
          required
        ></b-form-radio-group>
      </b-form-group>

      <b-form-group label="Emergency">
        <b-form-radio-group
          id="emergency"
          v-model="emergency"
          :options="filterPropertiesValues.emergency"
          name="emergency"
          required
        ></b-form-radio-group>
      </b-form-group>

      <b-button
        type="submit"
        class="w-100 mb-2"
        size="lg"
        variant="dark"
      >
        <span>{{mode === 'edit' ? 'Save changes' : 'Add demand'}}</span>
      </b-button>
    </b-form> -->
  </div>
</template>

<script>
import { getDatabase, ref, set, push } from 'firebase/database';
import { regions, filterPropertiesValues } from '@/env/constants';
import getCurrentDate from '@/utils/getCurrentDate';
// import GoBackButton from '@/components/common/GoBackButton.vue';

export default {
  name: 'DemandNew',
  // components: {
  //   GoBackButton,
  // },
  data() {
    return {
      id: this.$route.params.id,
      regions: regions,
      filterPropertiesValues: filterPropertiesValues,
      name: '',
      phone: '',
      selectedRegion: 'Kharkiv',
      city: '',
      street: '',
      demand: '',
      category: '',
      emergency: '',
    };
  },
  computed: {
    mode() {
      return this.id ? 'edit' : 'add';
    },
  },
  methods: {
    addDemand() {
      const db = getDatabase();
      const demandListRef = ref(db, 'demands');
      const newDemandRef = push(demandListRef);

      set(newDemandRef, {
        contactData: {
          name: this.name,
          phone: this.phone,
          address: {
            region: `${this.selectedRegion} region`,
            city: this.city,
            street: this.street,
          },
        },
        demand: this.demand,
        category: this.category,
        createdTime: getCurrentDate(),
        status: 'active',
        emergency: this.emergency,
      })
        .then(() => {
          this.$toast.success('The demand was added!', {
            timeout: 3500,
          });
          this.$router.push({ path: `/demands/detailed/${newDemandRef.key}` });
        })
        .catch(() => {
          this.$toast.error('Sorry, something went wrong! Try again later!', {
            timeout: 3500,
          });
          this.$router.push({ path: '/demands/list' });
        });
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 30px;
}
</style>
