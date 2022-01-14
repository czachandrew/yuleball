<template>
  <div v-for="(award, key) in awards" :key="key">
    <h4 class="font-bold text-xl mb-6">{{ award.description }}</h4>
    <div class="flex flex-auto">
      <QrcodeVue
        :size="100"
        class="mr-10 mb-10"
        :value="`https://compassionate-mclean-4f6bc3.netlify.app/scan/${award.anchor}`"
      ></QrcodeVue>
      <QrcodeVue
        :size="200"
        class="mr-10 mb-10"
        :value="`https://compassionate-mclean-4f6bc3.netlify.app/scan/${award.anchor}`"
      ></QrcodeVue>
      <QrcodeVue
        :size="400"
        class="mr-10 mb-10"
        :value="`https://compassionate-mclean-4f6bc3.netlify.app/scan/${award.anchor}`"
      ></QrcodeVue>
    </div>
  </div>
</template>
<script lang="ts" setup>
//get all the awards and render them all out

import { AwkwardApi } from "@/api/AwkwardApi";
import QrcodeVue from "qrcode.vue";
import { ref } from "vue";

const awards = ref([]);
const api = new AwkwardApi();
api.getAllAwards().then((response) => {
  console.log(response);
  awards.value = response.results;
});
const props = defineProps({});
</script>
