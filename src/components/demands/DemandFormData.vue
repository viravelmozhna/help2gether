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
            v-model="localName"
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
            v-model="localPhone"
          />
        </b-form-group>

        <b-form-group
          label="Address"
          label-for="address"
        >
          <AddressAutocomplete v-on:getAddress="getAddress" />

          <b-card-text
            class="mb-3 mt-2"
            v-if="selectedFormattedAddress"
          >
            <span class="mr-2 label font-weight-bold">Current address:</span>
            <span>{{ selectedFormattedAddress }}</span>
          </b-card-text>

          <LeafletMap
            :centeredCoords="centeredCoords || selectedCoords || coords"
            :zoomNumber="zoomNumber"
            class="mt-3"
            :isHeightSet="true"
          >
            <MapMarker
              v-if="selectedCoords || coords"
              :marker="selectedCoords || coords"
            />
          </LeafletMap>
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
            v-model="localDemand"
          />
        </b-form-group>

        <b-form-group label="Category">
          <b-form-radio-group
            id="categories"
            name="categories"
            :options="filterPropertiesValues.category"
            required
            v-model="localCategory"
          ></b-form-radio-group>
        </b-form-group>

        <b-form-group label="Emergency">
          <b-form-radio-group
            id="emergency"
            name="emergency"
            :options="filterPropertiesValues.emergency"
            required
            v-model="localEmergency"
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
import AddressAutocomplete from '../map/AddressAutocomplete.vue';
import MapMarker from '../map/MapMarker.vue';
import LeafletMap from '../map/LeafletMap.vue';

export default {
  name: 'DemandFormData',
  components: {
    GoBackButton,
    AddressAutocomplete,
    MapMarker,
    LeafletMap,
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
      selectedCoords: null,
      selectedFormattedAddress: this.formattedAddress || '',
      selectedCity: this.city || '',
      localName: this.name || '',
      localPhone: this.phone || '',
      localDemand: this.demand || '',
      localCategory: this.category || '',
      localEmergency: this.emergency || '',
    };
  },
  watch: {
    formattedAddress(value) {
      this.selectedFormattedAddress = value || '';
    },
    coords(value) {
      this.selectedCoords = value || null;
    },
    city(value) {
      this.selectedCity = value || '';
    },
    name(value) {
      this.localName = value || '';
    },
    phone(value) {
      this.localPhone = value || '';
    },
    demand(value) {
      this.localDemand = value || '';
    },
    category(value) {
      this.localCategory = value || '';
    },
    emergency(value) {
      this.localEmergency = value || '';
    },
  },
  computed: {
    demandData() {
      return {
        category: this.localCategory,
        demand: this.localDemand,
        emergency: this.localEmergency,
        name: this.localName,
        phone: this.localPhone,
        coords: this.selectedCoords || this.coords,
        formattedAddress: this.selectedFormattedAddress,
        city: this.selectedCity,
      };
    },
  },
  methods: {
    getAddress(e) {
      this.selectedCoords = e.coords;
      this.selectedFormattedAddress = e.formattedAddress;
      this.selectedCity = e.city;
      this.zoomNumber = zoomMapNumbers.DEFAULT_VALUE;
      this.centeredCoords = e.coords;
    },
    formSubmit() {
      if (!this.demandData.coords || !this.demandData.city) {
        this.$toast.error('Please select an address from the suggestions', {
          timeout: 3000,
        });
        return;
      }

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
