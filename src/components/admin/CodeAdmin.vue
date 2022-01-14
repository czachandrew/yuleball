<template>
  <!-- All the objectives and their codes -->
  <!-- All the Awards and their codes -->
  <div class="bg-white" v-if="current.results.length > 0">
    <PointsHubVue />
    {{ current.results[0].title }}
    <div
      class="rounded-t-xl overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-100 p-10"
    >
      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Description</th>
            <th class="px-4 py-2">Anchor</th>
            <th class="px-4 py-2">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(objective, key) in current.results" :key="key">
            <td
              class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium"
            >
              {{ objective.title }}
            </td>
            <td
              class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium"
            >
              {{ objective.anchor }}
            </td>
            <td
              class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium"
            >
              <QrcodeVue :value="objective.anchor"></QrcodeVue>
            </td>
            <td
              class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium"
            >
              <button
                class="p-4 bg-blue-400 rounded-lg"
                @click="viewPrintSheet"
              >
                Print View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Link to live event admin -->
</template>
<script lang="ts" setup>
import { AwkwardApi, Objective } from "@/api/AwkwardApi";
import QrcodeVue from "qrcode.vue";
import PointsHubVue from "./PointsHub.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const current = ref({ results: [] as Objective[] });
const router = useRouter();

const api = new AwkwardApi();
api.getAllObjectives().then((response) => {
  console.log(response);
  current.value = response;
});

function viewPrintSheet() {
  router.push({
    name: "Print",
    params: { size: 200, help: "Here is the help", anchor: "just-testing" }
  });
}
</script>
