<template>
  <div class="bg-white shadow-lg rounded-xl py-8 px-8 mx-auto max-w-sm">
    <h1 class="font-bold text-lg mx-auto mb-5 potterize">Login</h1>
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
    <br />
    Error goes below
    <p class="text-red-800 font-bold" v-if="showError">{{ errorMessage }}</p>
    <button
      class="bg-blue-400 text-white hover:bg-blue-700 hover:text-gray-200 p-2 font-bold block mx-auto mt-3 rounded-lg px-5"
      @click="login"
    >
      Submit
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { AwkwardApi } from "@/api/AwkwardApi";
import { useRouter } from "vue-router";
function logData() {
  console.log(email.value, password.value);
}
const router = useRouter();
const email = ref("");
const password = ref("");
const showError = ref(false);
const errorMessage = ref("test");

const api = new AwkwardApi();

async function login() {
  try {
    const token = await api.login(email.value, password.value);
    console.log("token");
    const fetchData = await api.getHouses();
    router.push("/cup");
  } catch (error: any) {
    console.log(error);
    showError.value = true;
    errorMessage.value = "Check Username and email and try again";
    console.log(error.value);
  }
}
</script>
