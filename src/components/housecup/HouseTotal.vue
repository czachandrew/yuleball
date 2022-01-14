<template>
  <div>
    <h5 class="potterize font-bold text-2xl text-yellow-500">
      {{ props.house }}
    </h5>
    <div
      class="w-20 bg-gray-200 mb-6 mr-auto ml-auto relative rounded-xl border-yellow-400 border-2"
      style="height: 400px"
    >
      <div :class="fillClass" :style="`height: ${filler}%`"></div>
    </div>
    <!-- <p>{{ points }}</p>
    <button class="bg-blue-700 p-5 rounded-md" @click="addPoints(10)">
      Add Points
    </button> -->
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "@/store/index";
import { useHousecup, House } from "@/store/housecup";
import { computed, ref } from "vue";

const props = defineProps({
  house: {
    type: String,
    required: true,
  },
});

const cupStore = useHousecup();

const points = computed(() => cupStore.housePoints(props.house as House));
const filler = computed(() => {
  if (cupStore.totalPoints < 2000) {
    return (points.value / 2000) * 100;
  } else {
    return (points.value / cupStore.totalPoints) * 100;
  }
});

const fillClass = computed(() => {
  let className = "h-full absolute inset-x-0 bottom-0 rounded-xl";
  switch (props.house) {
    case "gryfindor":
      className += " ruby";
      break;
    case "slytherin":
      className += " emerald";
      break;
    case "hufflepuff":
      className += " topaz";
      break;
    case "ravenclaw":
      className += " saphire";
      break;
    default:
      break;
  }
  return className;
});
//This is for debuggin only //
const addPoints = (amt: number) => {
  cupStore.managePointIncrease({
    house: props.house as House,
    points: amt,
  });
};
</script>
