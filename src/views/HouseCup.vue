<template>
  <div class="house-cup-dashboard">
    <p>Total Points: {{ pointTotal }}</p>
    <HouseTotal house="slytherin" />
    <HouseTotal house="gryffindor" />
    <HouseTotal house="hufflepuff" />
    <HouseTotal house="ravenclaw" />
  </div>
</template>
<script lang="ts" setup>
import HouseTotal from "@/components/housecup/HouseTotal.vue";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const pointTotal = computed(() => store.getters.totalPoints);
</script>
