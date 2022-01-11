<template>
  <div
    v-if="show"
    class="fixed text-gray-500 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0"
  >
    <div class="bg-white rounded-xl shadow-2xl p-6 sm:w-10/12 mx-10">
      <h5 class="text-2xl font-bold potterize">{{ title }}</h5>
      <h5 class="p-5 font-bold max-w-md m-auto">{{ message }}</h5>
      <button
        class="bg-red-500 p-3 rounded-xl mr-4 text-white font-bold"
        @click="emit('close')"
      >
        Close
      </button>
      <button
        class="bg-yellow-400 border-yellow-800 p-3 rounded-xl potterize text-yellow-900"
        @click="performAction"
      >
        {{ action.detail }}
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface ActionPayload {
  type: string;
  detail: string;
  instruction: string;
}
import { defineEmits, PropType } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  title: String,
  show: Boolean,
  message: String,
  action: {
    type: Object as PropType<ActionPayload>,
    required: true,
  },
});

const router = useRouter();

const emit = defineEmits(["close"]);

function performAction() {
  if (props.action.type === "nav") {
    router.push({ name: props.action.instruction });
  }
}
</script>
