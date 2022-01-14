<template>
  <div class="p-7 m-auto w-10/12">
    <div id="nav" v-if="okToShow">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/cup">House Cup</router-link> |
      <router-link to="/maze">Maze</router-link>
      <button class="bg-blue-800 px-4 py-2 rounded-lg" @click="testToast">
        Toast
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";
const router = useRouter();
const store = useStore();

const okToShow = computed(() => {
  if (
    router.currentRoute.value.name === "Staff" ||
    router.currentRoute.value.name === "Admin"
  ) {
    return true;
  } else {
    return false;
  }
});

function testToast() {
  store.addToast({
    id: "120349",
    title: "House Points for Gryfindor!",
    message: "Andy has earned House Gryfindor 50 points!",
    timestamp: "Just Now",
  });
}
</script>
