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
            v-model="contactData.name"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          label="Phone"
          label-for="phone"
        >
          <b-form-input
            id="phone"
            type="text"
            v-model="contactData.phone"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          label="Region"
          label-for="region"
        >
          <b-form-input
            id="region"
            type="text"
            placeholder="Kharkiv, Kyiv etc."
            v-model="contactData.address.region"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          label="City"
          label-for="city"
        >
          <b-form-input
            id="city"
            type="text"
            v-model="contactData.address.city"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          label="Street"
          label-for="street"
        >
          <b-form-input
            id="street"
            type="text"
            v-model="contactData.address.street"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          label="Demand"
          label-for="demand"
        >
          <b-form-input
            id="demand"
            type="text"
            v-model="demand"
          >
          </b-form-input>
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

export default {
  name: 'AddDemand',
  data() {
    return {
      contactData: {
        name: '',
        phone: '',
        address: {
          region: '',
          city: '',
          street: '',
        },
      },
      demand: '',
      category: '',
      status: '',
      emergency: '',
    };
  },
  methods: {
    addDemand() {
      const db = getDatabase();
      const demandId = shortid.generate();
      const currentTime = Date.now();
      console.log(currentTime);
      set(ref(db, 'demands/' + demandId), {
        contactData: {
          name: this.contactData.name,
          phone: this.contactData.phone,
          address: {
            region: `${this.contactData.address.region} region`,
            city: this.contactData.address.city,
            street: this.contactData.address.street,
          },
        },
        demand: this.demand,
        category: 'food',
        createdTime: currentTime,
        status: 'active',
        emergency: 'urgent',
      });
    },
  },
};
</script>
