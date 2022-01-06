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
import { useHousecup } from "@/store/housecup";
const store = useHousecup();
const pointTotal = computed(() => store.totalPoints);
</script>
