<template>
  <h5>{{ props.house }}</h5>
  <div class="w-20 h-16 bg-gray-200 mb-6 mr-auto ml-auto relative">
    <div
      class="bg-blue-600 h-full absolute inset-x-0 bottom-0"
      :style="`height: ${filler}%`"
    ></div>
  </div>
  <p>{{ points }}</p>
  <button class="bg-blue-700 p-5 rounded-md" @click="addPoints(10)">
    Add Points
  </button>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";

const props = defineProps({
  house: {
    type: String,
    required: true,
  },
});
const store = useStore();

const filler = ref(25);

const points = computed(() => store.state.housecup[props.house].points);

const addPoints = (amt: number) => {
  if (filler.value < 100) filler.value += 10;
  store.dispatch("managePointIncrease", {
    house: props.house,
    points: amt,
  });
  store.commit("addToast", {
    title: "Test",
    message: "This is a test message",
    timestamp: "Just Now",
  });
};
</script>
