<template>
  <div class="container mx-auto" v-if="message === undefined">
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
  <div v-else class="container mx-auto my-auto">
    <h4 class="text-2xl potterize">
      Easy there Grainger save some points for the rest of us.
    </h4>
    <p class="text-2xl font-bold">
      You are on cooldown for {{ cooldown }} seconds.
    </p>
  </div>
</template>
<script lang="ts" setup>
import { Award } from "@/api/AwkwardApi";
import { PropType, ref, computed } from "vue";

const props = defineProps({
  award: {
    type: Object as PropType<Award>,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  timer: {
    type: Number,
    required: false,
  },
});

const seconds = ref(0);

if (props.timer !== undefined) {
  seconds.value = 60 - Math.round(props.timer);
  const interval = setInterval(() => {
    seconds.value = seconds.value - 1;
    if (seconds.value < 1) {
      clearInterval(interval);
    }
  }, 1000);
}

const cooldown = computed(() => {
  if (props.timer !== undefined) {
    return seconds.value;
  } else {
    return 0;
  }
});
</script>
