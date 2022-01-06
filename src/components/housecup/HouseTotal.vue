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
import { useStore } from "@/store/index";
import { useHousecup, House } from "@/store/housecup";
import { computed, ref } from "vue";

const props = defineProps({
  house: {
    type: String,
    required: true
  }
});
const store = useStore();
const cupStore = useHousecup();

const filler = ref(25);

const points = computed(() => cupStore.housePoints(props.house as House));

const makeid = (length: number) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const addPoints = (amt: number) => {
  if (filler.value < 100) filler.value += 10;
  cupStore.managePointIncrease({
    house: props.house as House,
    points: amt
  });
  const toastId = store.addToast({
    id: makeid(5),
    title: "Test",
    message: "This is a test message",
    timestamp: "Just Now"
  });
};
</script>
