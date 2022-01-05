<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    LoginForm,
  },
});
</script>
