<template>
  <div class="container">
    <h1 class="text-left title">Add new demand</h1>
    <b-form @submit.prevent="addDemand" class="w-50">
      <b-form-group
        label="Name"
        label-for="name"
      >
        <b-form-input
          id="name"
          type="text"
          v-model="name"
          autocomplete="off"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Phone"
        label-for="phone"
      >
        <b-form-input
          id="phone"
          type="tel"
          v-model="phone"
          autocomplete="off"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Region"
      >
        <b-form-select
          :options="regions"
          v-model="region"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group
        label="City"
        label-for="city"
      >
        <b-form-input
          id="city"
          type="text"
          v-model="city"
          autocomplete="off"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Street"
        label-for="street"
      >
        <b-form-input
          id="street"
          type="text"
          v-model="street"
          autocomplete="off"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Demand"
        label-for="demand"
      >
        <b-form-textarea
          id="demand"
          type="text"
          v-model="demand"
          rows="3"
          required
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
        Add demand
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { getDatabase, ref, set } from 'firebase/database';
import shortid from 'shortid';
import { regions, filterPropertiesValues } from '@/env/constants';

export default {
  name: 'AddDemand',
  data() {
    return {
      regions: regions,
      filterPropertiesValues: filterPropertiesValues,
      name: '',
      phone: '',
      region: 'Kharkiv',
      city: '',
      street: '',
      demand: '',
      category: '',
      emergency: '',
    };
  },
  methods: {
    addDemand() {
      const db = getDatabase();
      const demandId = shortid.generate();
      const date = new Date();
      const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
      const currentTime = `${day.toString().padStart(2, '0')}.${(month + 1).toString().padStart(2, '0')}.${year}`;
      set(ref(db, 'demands/' + demandId), {
        contactData: {
          name: this.name,
          phone: this.phone,
          address: {
            region: `${this.region} region`,
            city: this.city,
            street: this.street,
          },
        },
        demand: this.demand,
        category: this.category,
        createdTime: currentTime,
        status: 'active',
        emergency: this.emergency,
      });
      this.$toast.success('The demand was added!', {
        timeout: 3500,
      });
      this.$router.push({ path: `/demands/detailed/${demandId}` });
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 30px;
}
</style>
