<template>
  <p>Total Points: {{ pointTotal }}</p>
  <p
    class="potterize text-8xl leader-background bg-center bg-clip-contain mb-4 pt-20"
    style="height: 300px"
  >
    Leader: {{ leader.friendly_name }}
  </p>
  <div class="bg-cover grid grid-cols-4 gap-4">
    <HouseTotal house="slytherin" />
    <HouseTotal house="gryfindor" />
    <HouseTotal house="hufflepuff" />
    <HouseTotal house="ravenclaw" />
  </div>
</template>
<script lang="ts" setup>
import HouseTotal from "@/components/housecup/HouseTotal.vue";
import { computed } from "vue";
import { useHousecup } from "@/store/housecup";
import { AwkwardApi } from "@/api/AwkwardApi";
const api = new AwkwardApi();
const store = useHousecup();
api.getHouses().then((response) => {
  console.log(response.results);
  for (let index = 0; index < response.results.length; index++) {
    const element = response.results[index];
    console.log(element);
    store.setPoints(element.name.toLowerCase(), element.points);
  }
});

const pointTotal = computed(() => store.totalPoints);
const leader = computed(() => store.leader);
</script>
<style>
.house-cup-dashboard {
  background-image: url("../assets/gryfindor-hogwarts-house.jpeg");
}

.leader-background {
  background-image: url("../assets/scroll3.png");
  background-repeat: no-repeat;
}
</style>
