<template>
  <div class="bg-white p-6 text-center">
    Scan Page
    <p class="font-bold text-xl potterize" v-if="!loaded">Loading</p>
    <p class="font-bold" v-else>{{ props.slug }}</p>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { AwkwardApi } from "@/api/AwkwardApi";

const api = new AwkwardApi();

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const loaded = ref(false);

api
  .getHouses()
  .then((response) => {
    console.log(response);
    loaded.value = true;
  })
  .catch((error) => {
    console.log(error);
  });

// setTimeout(() => {
//   const data = getData();
//   console.log(data);
// }, 200);
</script>
