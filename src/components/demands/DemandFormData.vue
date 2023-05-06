<template>
  <div class="container">
    <GoBackButton />

    <b-card
      bg-variant="light"
      class="mt-2 mb-5 mr-auto ml-auto demand-data-form"
    >
      <h1 class="text-left title">
        <span>{{ mode === modes.EDIT ? 'Edit demand' : 'Add demand' }}</span>
      </h1>

      <b-form
        @submit.prevent="formSubmit"
        @keydown.enter.prevent
      >
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
            @change="(e) => (demandData.name = e.target.value)"
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
            @change="(e) => (demandData.phone = e.target.value)"
          />
        </b-form-group>

        <b-form-group
          label="Address"
          label-for="address"
        >
          <GoogleAutocomplete v-on:getAddress="getAddress" />

          <b-card-text
            class="mb-3"
            v-if="formattedAddress"
          >
            <span class="mr-2 label font-weight-bold">Current address:</span>
            <span>{{ formattedAddress }}</span>
          </b-card-text>

          <GoogleMap
            :centeredCoords="centeredCoords || coords"
            :zoomNumber="zoomNumber"
            class="mt-3"
            :isHeightSet="true"
          >
            <GoogleMarker
              v-if="demandData.coords"
              :marker="demandData.coords"
            />
          </GoogleMap>
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
            @change="(e) => (demandData.demand = e.target.value)"
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
          <span>{{ mode === modes.EDIT ? 'Save changes' : 'Add demand' }}</span>
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { filterPropertiesValues, modes, zoomMapNumbers } from '@/env/constants';
import GoBackButton from '@/components/common/GoBackButton.vue';
import GoogleAutocomplete from '../map/GoogleAutocomplete.vue';
import GoogleMarker from '../map/GoogleMarker.vue';
import GoogleMap from '../map/GoogleMap.vue';

export default {
  name: 'DemandFormData',
  components: {
    GoBackButton,
    GoogleAutocomplete,
    GoogleMarker,
    GoogleMap,
  },
  props: {
    mode: String,
    category: String,
    demand: String,
    emergency: String,
    name: String,
    phone: String,
    coords: Object,
    formattedAddress: String,
    city: String,
  },
  data() {
    return {
      filterPropertiesValues: filterPropertiesValues,
      modes: modes,
      zoomNumber:
        this.mode === modes.EDIT
          ? zoomMapNumbers.DEFAULT_VALUE
          : zoomMapNumbers.DEMAND_FORM_ADD_MODE_VALUE,
      centeredCoords: null,
    };
  },
  computed: {
    demandData() {
      return {
        category: this.category,
        demand: this.demand,
        emergency: this.emergency,
        name: this.name,
        phone: this.phone,
        coords: this.coords,
        formattedAddress: this.formattedAddress,
        city: this.city,
      };
    },
  },
  methods: {
    getAddress(e) {
      this.demandData.coords = e.coords;
      this.demandData.formattedAddress = e.formattedAddress;
      this.demandData.city = e.city;
      this.zoomNumber = zoomMapNumbers.DEFAULT_VALUE;
      this.centeredCoords = e.coords;
    },
    formSubmit() {
      const demandData = {
        name: this.demandData.name,
        phone: this.demandData.phone,
        demand: this.demandData.demand,
        category: this.demandData.category,
        emergency: this.demandData.emergency,
        coords: this.demandData.coords,
        formattedAddress: this.demandData.formattedAddress,
        city: this.demandData.city,
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
.demand-data-form {
  box-shadow: 7px 7px 29px -6px rgba(0, 0, 0, 0.24);
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
