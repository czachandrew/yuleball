<template>
  <QrcodeVue
    class="mb-6"
    :render-as="'svg'"
    :size="size"
    :value="completeUrl"
  ></QrcodeVue>
  <h2 class="text-2xl mt-6 potterize" v-if="help">
    {{ help }}
  </h2>
</template>
<script lang="ts" setup>
import QrcodeVue from "qrcode.vue";
import { computed } from "vue";
const props = defineProps({
  size: Number,
  help: String,
  anchor: String,
  extra: {
    type: String,
    required: false,
  },
});

const completeUrl = computed(
  () => `https://compassionate-mclean-4f6bc3.netlify.app/scan/${props.anchor}`
);
</script>
