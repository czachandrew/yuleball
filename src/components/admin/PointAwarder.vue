<template>
  <div>
    <label class="form-label">Points to add</label>
    <input
      type="number"
      v-model="amount"
      class="p-4 bg-white font-bold border-2 rounded-xl block text-center mx-auto mb-2"
    />
    <button :class="classString" @click="award" :disabled="working">
      {{ house }}
    </button>
  </div>
</template>
<script lang="ts" setup>
import { computed, PropType, ref } from "vue";
import { House, useHousecup } from "@/store/housecup";
import { AwkwardApi } from "@/api/AwkwardApi";

enum HouseColor {
  gryfindor = "bg-red-500",
  slytherin = "bg-green-500",
  hufflepuff = "bg-yellow-500",
  ravenclaw = "bg-blue-500",
  hogwarts = "bg-red-500",
  durmstrang = "bg-green-500",
  beauxbatons = "bg-blue-500"
}

const props = defineProps({
  points: Number,
  house: {
    type: String as PropType<House>,
    required: true
  }
});

const api = new AwkwardApi();
const cup = useHousecup();
const working = ref(false);

const classString = computed(() => {
  let base = " font-bold potterize text-xl px-6 py-4 rounded-xl";
  const color = HouseColor[props.house];
  const string = color + base;
  return string;
});
const amount = ref(10);

async function award() {
  working.value = true;
  try {
    const result = await api.addPoints(amount.value, cup.houseId(props.house));
    console.log(result);
    working.value = false;
  } catch (error) {
    working.value = false;
  }
}
</script>
