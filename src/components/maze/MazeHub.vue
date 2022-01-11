<template>
  <div class="shadow-xl box-border bg-white p-4 rounded-xl h-1/2">
    <!-- Step Counter -->
    <h1 class="font-bold text-lg potterize">You have found 1 of 15</h1>
    <!-- Image header goes here -->
    <img class="mx-auto mb-4" :src="'./assets/' + image" />
    <!-- Message body goes here -->
    <p class="text-xl block">
      {{ description }}
    </p>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  description: String,
  image: {
    type: String,
    default: "slytherin-hogwarts-house.jpeg",
  },
});
</script>
