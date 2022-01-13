<template></template>
<script lang="ts" setup>
import QrcodeVue from "qrcode.vue";
const props = defineProps({
  size: String,
  helpText: String,
  extra: {
    type: String,
    required: false,
  },
});
</script>
