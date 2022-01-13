<template>
  <div class="shadow-xl box-border bg-white p-4 rounded-xl h-1/2">
    <!-- Step Counter -->
    <h1 class="font-bold text-lg potterize">You have found 1 of 15</h1>
    <!-- Image header goes here -->
    <p v-if="message" class="potterize">
      It looks like you've been here before... review the clue carefully
    </p>
    <img
      class="mx-auto mb-4"
      :src="'http://127.0.0.1:8000' + objective.image"
    />
    <!-- Message body goes here -->
    <h4 class="potterize text-2xl">{{ objective.title }}</h4>
    <p class="text-xl block">
      {{ objective.description }}
    </p>
    <p>All clues have a QR Code solution, be sure to look carefully</p>
  </div>
</template>
<script lang="ts" setup>
import { Objective } from "@/api/AwkwardApi";
import { PropType } from "vue";

const props = defineProps({
  objective: {
    type: Object as PropType<Objective>,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
});
</script>
