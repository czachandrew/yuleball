<template>
  <div class="flex space-x-2 justify-center mb-4">
    <div
      class="bg-white shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block animate-fade-in-up"
      id="static-example"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-mdb-autohide="false"
    >
      <div
        class="bg-white flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-gray-200 rounded-t-lg"
      >
        <p class="font-bold text-gray-500">{{ props.title }}</p>
        <div class="flex items-center">
          <p class="text-gray-600 text-xs">{{ props.timestamp }}</p>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 ml-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-mdb-dismiss="toast"
            aria-label="Close"
            @click="emit('close')"
          ></button>
        </div>
      </div>
      <div class="p-3 bg-white rounded-b-lg break-words text-gray-700">
        {{ props.message }}
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
