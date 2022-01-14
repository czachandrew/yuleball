<template>
  <div
    class="bg-white border-t-4 border-gray-500 rounded-lg px-4 py-3 shadow-lg"
    role="alert"
  >
    <div class="flex">
      <div class="py-1">
        <img
          class="w-16 h-16 rounded-full mr-4"
          src="../../assets/dumbledore.png"
          alt="Avatar of Jonathan Reinink"
        />
      </div>
      <div>
        <p class="font-bold potterize">{{ title }}</p>
        <p class="text-sm">{{ message }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits } from "vue";
import { useStore } from "@/store/index";
//this is the stupid part that will just accept the content that we are supposed to have
const props = defineProps({
  message: String,
  timestamp: String,
  title: String,
  id: {
    type: String,
    required: true,
  },
});

const store = useStore();

setTimeout(() => {
  store.destroyToast(props.id);
}, 3000);

const emit = defineEmits(["close"]);
</script>
