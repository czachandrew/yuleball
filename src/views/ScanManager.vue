<template>
  <div class="bg-white p-6 text-center" v-if="loggedIn">
    <p class="font-bold text-xl potterize" v-if="!loaded">Loading</p>
    <div class="font-bold" v-else>
      <!-- {{ props.slug }} {{ returnValue.data }} {{ returnValue }} -->
      <MazeHubVue
        v-if="returnValue.type === 'objective'"
        :objective="returnValue.data"
        :message="returnValue.message"
      ></MazeHubVue>
      <AwardHub
        v-if="returnValue.type === 'award'"
        :award="returnValue.data"
        :message="returnValue?.message"
        :timer="returnValue?.for"
      ></AwardHub>
    </div>

    <GenericModalVue
      :show="showModal"
      :title="'You\'re not a muggle are ya?'"
      :action="{ type: 'nav', detail: 'Go to Login', instruction: 'Login' }"
      :message="'If you would like to resume your progress please sign in, otherise click cancel - but note you will not earn points for your house'"
      @close="showModal = false"
    ></GenericModalVue>
    <!-- <button
      class="p-4 bg-yellow-300 rounded-xl border-yellow-800"
      @click="showModal = true"
    >
      Test Modal
    </button> -->
  </div>
  <div class="mx-auto text-center items-center" v-else>
    <h1 class="text-center potterize text-xl">
      It looks like you haven't been sorted or aren't logged in...
    </h1>
    <div class="mx-auto">
      <button
        class="bg-blue-500 text-white font-bold rounded-lg p-4 m-2"
        @click="goToRegister"
      >
        Be Sorted (Register)
      </button>
      <button
        class="bg-green-500 text-white font-bold rounded-lg p-4 m-2"
        @click="goToLogin"
      >
        Login
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { AwkwardApi } from "@/api/AwkwardApi";
import { useRouter } from "vue-router";
import GenericModalVue from "@/components/modal/GenericModal.vue";
import MazeHubVue from "@/components/maze/MazeHub.vue";
import AwardHub from "@/components/award/AwardHub.vue";
const router = useRouter();

const api = new AwkwardApi();

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const showModal = ref(false);

const loaded = ref(false);
const returnValue = ref({});
const loggedIn = ref(true);

if (localStorage.getItem("token")) {
  //should be able to handle this
  api
    .checkSlug(props.slug)
    .then((response) => {
      console.log(response);
      returnValue.value = response;
      loaded.value = true;
    })
    .catch((error: Error) => {
      console.log(error.message);
      if (error.message === "401") {
        // we should pop a modal here and be like hey do you want to login and resume your progress?
        //   router.push("/login");
      }
    });
} else {
  loggedIn.value = false;
}

function goToRegister() {
  router.push("/register");
}

function goToLogin() {
  router.push("/login");
}

// setTimeout(() => {
//   const data = getData();
//   console.log(data);
// }, 200);
</script>
