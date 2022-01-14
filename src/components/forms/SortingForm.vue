<template>
  <!-- Get name and email to be sorted -->
  <div class="bg-white shadow-lg rounded-xl py-8 px-8 mx-auto max-w-screen-lg">
    <div class="">
      <label class="font-bold block text-sm">Email</label>
      <input
        type="text"
        class="border-2 border-gray-500 rounded-lg p-2 m-2"
        v-model="email"
      />
    </div>
    <div class="">
      <label class="font-bold block text-sm">First Name</label>
      <input
        type="text"
        class="border-2 border-gray-500 rounded-lg p-2 m-2"
        v-model="first_name"
      />
    </div>
    <div class="">
      <label class="font-bold block text-sm">Choose Your House</label>
      <select
        v-model="house"
        class="border-2 border-gray-500 rounded-lg p-2 m-2 max-w-full"
      >
        <option v-for="(house, key) in houses" :key="key" :value="house">
          {{ house }}
        </option>
      </select>
    </div>
    <div class="">
      <label class="font-bold block text-sm">Password</label>
      <input
        type="password"
        class="border-2 border-gray-500 rounded-lg p-2 m-2"
        v-model="password"
      />
    </div>
    <div class="">
      <label class="font-bold block text-sm">Password Confirm</label>
      <input
        type="password"
        class="border-2 border-gray-500 rounded-lg p-2 m-2"
        v-model="password_confirm"
      />
    </div>
    <p class="font-bold text-red-800" v-if="error">{{ error }}</p>
    <p class="text-gray-500 my-4 max-w-10">
      We value your privacy, your information will not be shared with any third
      parties.
    </p>
    <button
      class="px-6 py-2 rounded-lg drop-shadow-md bg-blue-700 text-white font-bold"
      @click="submit"
    >
      Sign up
    </button>
  </div>
</template>
<script lang="ts" setup>
import { AwkwardApi } from "@/api/AwkwardApi";
import { ref } from "vue";

const api = new AwkwardApi();

const houses = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];

const email = ref("");
const first_name = ref("");
const house = ref("");
const password = ref("");
const password_confirm = ref("");
const error = ref("");

function submit() {
  if (password.value !== password_confirm.value) {
    error.value = "Passwords must match";
    return;
  }
  console.log("Submitting the form");
  api.registerUser(email.value, first_name.value, password.value, house.value);
}
</script>
