<template>
  <div class="bg-white p-8 max-w-lg">
    <label class="block text-lg form-label">Short Description</label>
    <input
      class="border-2 border-gray-500 rounded-lg p-2 m-2"
      v-model="newAward.description"
      type="text"
    />
    <label class="text-sm font-bold block">Anchor Text</label
    ><input
      class="border-2 border-gray-500 rounded-lg p-2 m-2"
      v-model="newAward.anchor"
      type="text"
    />
    <label class="text-sm font-bold block">Point Value</label
    ><input
      class="border-2 border-gray-500 rounded-lg p-2 m-2"
      v-model="newAward.amount"
      type="number"
    />
    <div class="form-check flex m-auto">
      <input
        class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm mr-2 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
        type="checkbox"
        v-model="newAward.reusable"
        id="flexCheckDefault"
      />
      <label
        class="form-check-label inline-block text-gray-800"
        for="flexCheckDefault"
      >
        Code can be used multiple times
      </label>
    </div>
    <div class="form-control block">
      <label class="form-label text-gray-800 block">Optional Image:</label>
      <input
        type="file"
        class="file"
        ref="image"
        @change="handleFileUpload($event)"
      />
    </div>
    <button
      type="button"
      @click="create"
      class="mt-4 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
      :disabled="working"
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        v-if="working"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {{ buttonText }}
    </button>
  </div>
</template>
<script lang="ts" setup>
import { AwkwardApi } from "@/api/AwkwardApi";
import { reactive, ref, computed } from "vue";

const api = new AwkwardApi();
const image = ref(null);

const newAward = reactive({
  description: "",
  anchor: "",
  amount: 5,
  reusable: false,
  image: "",
});

const working = ref(false);
const error = ref("");

function handleFileUpload(event: any) {
  console.log("We are going to attach the image to the form");
  newAward.image = event.target.files[0];
}

const buttonText = computed(() => {
  if (working.value) {
    return "processing";
  } else {
    return "Create";
  }
});

async function create() {
  working.value = true;
  try {
    const awardResponse = await api.createAward(newAward);
    console.log("here is the created reward");
    console.log(awardResponse);
    newAward.description = "";
    newAward.anchor = "";
    newAward.amount = 5;
    newAward.reusable = false;
    newAward.image = "";
    working.value = false;
  } catch (err: any) {
    console.log(
      "there was a problem when it came to creating the award - this message comes from the component"
    );
    console.log(err);
    error.value = err.message;
    working.value = false;
  }
}
</script>
