<template>
  <div>
    <div class="absolute top-4 left-4">
      <ToastComponent
        v-for="(toast, index) in toasts"
        :key="index"
        :message="toast.message"
        timestamp="Just Now"
        :title="toast.title"
        :id="toast.id"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import ToastComponent from "@/components/toast/ToastComponent.vue";

import { computed } from "vue";
import { useStore } from "@/store/index";
const store = useStore();
const toasts = computed(() => store.toasts);
</script>
