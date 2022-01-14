<template>
  <div class="container mx-auto">
    <h1 class="text-xl potterize">Congratulations!</h1>
    <img
      class="self-center mx-auto"
      :src="'https://yule-ball.herokuapp.com' + award.image"
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
