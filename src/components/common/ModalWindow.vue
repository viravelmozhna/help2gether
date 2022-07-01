<template>
  <b-modal id="modalWindow" ref="modalWindow" hide-footer :title="title" centered>
    <div>
      <b-button
        @click="chooseOption('cancel')"
        class="mr-2"
      >Cancel</b-button>
      <b-button
        @click="chooseOption('approve')"
        variant="success"
      >Yes</b-button>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalWindow',
  methods: {
    chooseOption(option) {
      this.$refs.modalWindow.hide();
      this.$emit('actionInModalWindow', option);
    },
  },
  props: {
    title: String,
  },
};
</script>
