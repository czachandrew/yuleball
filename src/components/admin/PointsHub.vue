<template>
  <div class="grid grid-cols-2 gap-4">
    <!-- <PointAwarder class="" :house="House.Gryfindor" amount="25" />
    <PointAwarder :house="House.Slytherin" amount="25" />
    <PointAwarder :house="House.Hufflepuff" amount="25" />
    <PointAwarder :house="House.Ravenclaw" amount="25" /> -->
    <PointAwarder :house="House.Hogwarts" amount="25" />
    <PointAwarder :house="House.Durmstrang" amount="25" />
    <PointAwarder :house="House.Beauxbatons" amount="25" />
  </div>
</template>
<script lang="ts" setup>
import { House } from "@/store/housecup";
import PointAwarder from "@/components/admin/PointAwarder.vue";
</script>
