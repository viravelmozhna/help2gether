<template>
  <div class="container">

    <GoBackButton />

    <b-card
      bg-variant="light"
      class="mt-2 mr-auto ml-auto demand-data-form"
    >

      <h1 class="text-left title">
        <span>{{mode === 'edit' ? 'Edit demand' : 'Add demand'}}</span>
      </h1>

    <b-form @submit.prevent="formSubmit">

      <b-form-group
        label="Name"
        label-for="name"
      >
        <input
          id="name"
          type="text"
          class="form-control"
          autocomplete="off"
          required
          :value="demandData.name"
          @change="e => demandData.name = e.target.value"
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
          autocomplete="off"
          required
          :value="demandData.phone"
          @change="e => demandData.phone = e.target.value"
        />
      </b-form-group>

      <b-form-group
        label="Region"
      >
        <b-form-select
          :options="regions"
          required
          v-model="demandData.region"
        ></b-form-select>
      </b-form-group>

      <b-form-group
        label="City"
        label-for="city"
      >
        <input
          id="city"
          type="text"
          class="form-control"
          autocomplete="off"
          required
          :value="demandData.city"
          @change="e => demandData.city = e.target.value"
        />
      </b-form-group>

      <b-form-group
        label="Street"
        label-for="street"
      >
        <input
          id="street"
          type="text"
          class="form-control"
          autocomplete="off"
          required
          :value="demandData.street"
          @change="e => demandData.street = e.target.value"
        />
      </b-form-group>

      <b-form-group
        label="Demand"
        label-for="demand"
      >
        <textarea
          id="demand"
          type="text"
          class="form-control"
          rows="3"
          required
          autocomplete="off"
          :value="demandData.demand"
          @change="e => demandData.demand = e.target.value"
        />
      </b-form-group>

      <b-form-group label="Category">
        <b-form-radio-group
          id="categories"
          name="categories"
          :options="filterPropertiesValues.category"
          required
          v-model="demandData.category"
        ></b-form-radio-group>
      </b-form-group>

      <b-form-group label="Emergency">
        <b-form-radio-group
          id="emergency"
          name="emergency"
          :options="filterPropertiesValues.emergency"
          required
          v-model="demandData.emergency"
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
    </b-form>
    </b-card>
  </div>
</template>

<script>
import { getDatabase, ref, child, get } from 'firebase/database';
import { regions, filterPropertiesValues } from '@/env/constants';

import GoBackButton from '@/components/common/GoBackButton.vue';

const db = getDatabase();

export default {
  name: 'DemandFormData',
  components: {
    GoBackButton,
  },
  props: {
    mode: String,
    demandId: String,
  },
  data() {
    return {
      regions: regions,
      filterPropertiesValues: filterPropertiesValues,
      demandData: {
        name: '',
        phone: '',
        region: 'Kharkiv',
        city: '',
        street: '',
        demand: '',
        category: '',
        emergency: '',
      },
    };
  },
  created() {
    if (this.demandId) {
      get(child(ref(db), `demands/${this.demandId}`))
        .then((snapshot) => {
          const data = snapshot.val();
          this.demandData = {
            name: data.contactData.name,
            phone: data.contactData.phone,
            region: data.contactData.address.region.split(' ')[0],
            city: data.contactData.address.city,
            street: data.contactData.address.street,
            demand: data.demand,
            category: data.category,
            emergency: data.emergency,
          };
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
    formSubmit() {
      const demandData = {
        name: this.demandData.name,
        phone: this.demandData.phone,
        region: `${this.demandData.region} region`,
        city: this.demandData.city,
        street: this.demandData.street,
        demand: this.demandData.demand,
        category: this.demandData.category,
        emergency: this.demandData.emergency,
      };
      this.$emit('formSubmit', demandData);
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 30px;
}
@media screen and (max-width: 549px) {
  .demand-data-form {
    width: 90vw;
  }
}
@media screen and (min-width: 550px) {
  .demand-data-form {
    width: 400px;
  }
}
@media screen and (min-width: 900px) {
  .demand-data-form {
    width: 450px;
  }
}
</style>
