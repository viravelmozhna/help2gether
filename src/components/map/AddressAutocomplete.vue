<template>
  <div class="autocomplete-wrap">
    <input
      id="address"
      type="text"
      class="w-100 autocomplete rounded"
      autocomplete="off"
      placeholder="Start typing an address in Ukraine"
      :value="query"
      @input="onInput"
      @focus="showSuggestions = suggestions.length > 0"
      @blur="hideSuggestionsSoon"
    />
    <ul
      v-if="showSuggestions && suggestions.length"
      class="suggestions"
    >
      <li
        v-for="(item, index) in suggestions"
        :key="`${item.formattedAddress}-${index}`"
        @mousedown.prevent="selectSuggestion(item)"
      >
        {{ item.formattedAddress }}
      </li>
    </ul>
  </div>
</template>

<script>
const PHOTON_URL = 'https://photon.komoot.io/api/';
// Approximate Ukraine bounding box: west,south,east,north
const UKRAINE_BBOX = '22.13,44.38,40.23,52.38';

export default {
  name: 'AddressAutocomplete',
  data() {
    return {
      query: '',
      suggestions: [],
      showSuggestions: false,
      debounceTimer: null,
    };
  },
  beforeDestroy() {
    clearTimeout(this.debounceTimer);
  },
  methods: {
    onInput(e) {
      this.query = e.target.value;
      clearTimeout(this.debounceTimer);

      if (!this.query || this.query.trim().length < 3) {
        this.suggestions = [];
        this.showSuggestions = false;
        return;
      }

      this.debounceTimer = setTimeout(() => {
        this.fetchSuggestions(this.query.trim());
      }, 350);
    },
    hideSuggestionsSoon() {
      setTimeout(() => {
        this.showSuggestions = false;
      }, 150);
    },
    async fetchSuggestions(q) {
      try {
        const params = new URLSearchParams({
          q,
          lang: 'en',
          limit: '6',
          bbox: UKRAINE_BBOX,
        });
        const response = await fetch(`${PHOTON_URL}?${params.toString()}`, {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Photon request failed: ${response.status}`);
        }

        const data = await response.json();
        this.suggestions = (data.features || [])
          .map(this.mapFeature)
          .filter((item) => {
            return item && item.city && item.coords;
          });
        this.showSuggestions = this.suggestions.length > 0;
      } catch (error) {
        console.log(error);
        this.suggestions = [];
        this.showSuggestions = false;
        this.$toast.error('Could not load address suggestions', {
          timeout: 2500,
        });
      }
    },
    mapFeature(feature) {
      const props = feature.properties || {};
      const coordinates = feature.geometry && feature.geometry.coordinates;
      if (!coordinates || coordinates.length < 2) {
        return null;
      }
      if (
        props.countrycode && props.countrycode.toLowerCase() !== 'ua'
      ) {
        return null;
      }

      const city = props.city || props.town || props.village || props.county || '';
      const parts = [
        props.name,
        props.housenumber,
        props.street,
        city,
        props.state,
        props.country,
      ].filter(Boolean);

      return {
        city,
        formattedAddress: parts.join(', '),
        coords: {
          lat: coordinates[1],
          lng: coordinates[0],
        },
      };
    },
    selectSuggestion(item) {
      if (!item.city) {
        this.$toast.error('Please select the correct address from the list', {
          timeout: 3500,
        });
        return;
      }

      this.query = item.formattedAddress;
      this.suggestions = [];
      this.showSuggestions = false;
      this.$emit('getAddress', item);
    },
  },
};
</script>

<style scoped>
.autocomplete-wrap {
  position: relative;
}
.autocomplete {
  height: 40px;
  border: 1px solid #d3d3d3;
  color: #495057;
  padding-left: 12px;
  background: #fff;
}
.suggestions {
  position: absolute;
  z-index: 1100;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  background: #fff;
  border: 1px solid #d3d3d3;
  border-top: none;
  max-height: 220px;
  overflow-y: auto;
}
.suggestions li {
  padding: 8px 12px;
  cursor: pointer;
}
.suggestions li:hover {
  background: #f1f3f5;
}
</style>
