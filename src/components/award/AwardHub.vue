<template>
  <div class="container mx-auto">
    <h1 class="text-xl potterize">Congratulations!</h1>
    <img
      class="self-center mx-auto"
      :src="'http://127.0.0.1:8000' + award.image"
    />
    <p>
      You have found {{ award.description }} and earned
      {{ award.amount }} points for your house!
    </p>
  </div>
</template>
<script lang="ts" setup>
import { Award } from "@/api/AwkwardApi";
import { PropType } from "vue";

const props = defineProps({
  award: {
    type: Object as PropType<Award>,
    required: true,
  },
});
</script>
