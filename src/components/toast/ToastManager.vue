<template>
  <div>
    <div v-for="(toast, index) in toasts" :key="index">
      <ToastComponent
        :message="toast.message"
        timestamp="Just Now"
        :title="toast.title"
        :index="index"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import ToastComponent from "@/components/toast/ToastComonent.vue";
const store = useStore();
const toasts = computed(() => store.state.toasts);
</script>
