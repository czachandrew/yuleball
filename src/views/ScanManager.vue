<template>
  <div class="bg-white p-6 text-center">
    Scan Page
    <p class="font-bold text-xl potterize" v-if="!loaded">Loading</p>
    <div class="font-bold" v-else>
      {{ props.slug }} {{ returnValue }}
      <MazeHubVue v-if="returnValue.type === 'objective'"></MazeHubVue>
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
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { AwkwardApi } from "@/api/AwkwardApi";
import { useRouter } from "vue-router";
import GenericModalVue from "@/components/modal/GenericModal.vue";
import MazeHubVue from "@/components/maze/MazeHub.vue";
const api = new AwkwardApi();
const router = useRouter();

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});

const showModal = ref(false);

const loaded = ref(false);
const returnValue = ref({});

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

// setTimeout(() => {
//   const data = getData();
//   console.log(data);
// }, 200);
</script>
