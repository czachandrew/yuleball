<template>
  <LoginForm />
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { AwkwardApi } from "@/api/AwkwardApi";

import LoginForm from "@/components/forms/LoginForm.vue";

const api = new AwkwardApi();

function test() {
  console.log("I would test the api now");
  api.getUsers();
}

const loggedIn = computed(() => {
  if (localStorage.getItem("token")) {
    console.log(localStorage.getItem("token"));
    return true;
  } else {
    return false;
  }
});
</script>
