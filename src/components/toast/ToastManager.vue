<template>
  <div>
    <div class="mb-4" v-for="(toast, index) in toasts" :key="index">
      <ToastComponent
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
