<template>
  <div class="bg-red-100 p-7 m-auto w-10/12">
    <h1 class="font-bold text-xl">{{ message }}</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/cup">House Cup</router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
const message = "This is the message sir";
</script>
