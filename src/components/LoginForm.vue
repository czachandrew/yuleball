<template>
  <div class="bg-white shadow-lg rounded-xl py-8 px-8 mx-auto max-w-sm">
    <h1 class="font-bold text-lg mx-auto mb-5">Login</h1>
    <label class="block text-sm font-bold" for="email">Email</label>
    <input
      class="border-2 border-gray-500 rounded-lg p-2 m-2"
      v-model="email"
      type="text"
      name="email"
    />
    <label class="text-sm font-bold block" for="password"> Password </label>
    <input
      class="border-2 border-gray-500 rounded-lg p-2 m-2"
      v-model="password"
      name="password"
      type="password"
    />
    <button
      class="bg-blue-400 text-white hover:bg-blue-700 hover:text-gray-200 p-2 rounded-sm font-bold block mx-auto mt-3"
      @click="logData"
    >
      Submit
    </button>
    <p>Some other stuff</p>
    <p>{{ email }}</p>
    {{ password }}
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

let email = ref("");
let password = ref("");

function logData() {
  console.log(email.value, password.value);
}
</script>
