<template>
  <div class="bg-white flex-auto">
    {{ activeAwards }}
    Total Awards: {{ activeAwards.count }}
    <CreateAwardForm />
    <div
      class="rounded-t-xl overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-100 p-10"
    >
      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Award</th>
            <th class="px-4 py-2">Anchor</th>
            <th class="px-4 py-2">Amount</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Code</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(award, key) in activeAwards.results" :key="key">
            <td
              class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium"
            >
              {{ award.description }}
            </td>
            <td
              class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium"
            >
              {{ award.anchor }}
            </td>
            <td
              class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium"
            >
              {{ award.amount }}
            </td>
            <td
              class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium"
            >
              {{ award.status }}
            </td>
            <td
              class="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium"
            >
              <button
                class="bg-red-500 p-4 rounded-lg shadow-sm"
                @click="destroy(award.id)"
              >
                Delete
              </button>
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
</template>
<script lang="ts" setup>
import { Award, AwkwardApi } from "@/api/AwkwardApi";
import { ref } from "vue";
import CreateAwardForm from "@/components/forms/CreateAwardForm.vue";
import { useRouter } from "vue-router";
const api = new AwkwardApi();
const activeAwards = ref([] as Award[]);
const router = useRouter();
api
  .getAllAwards()
  .then((awards) => {
    console.log(awards);
    activeAwards.value = awards;
  })
  .catch((error) => {
    console.log(error);
  });

function viewPrintSheet() {
  router.push({
    name: "Print",
    params: { size: 200, help: "Here is the help", anchor: "just-testing" }
  });
}

async function destroy(id: number): Promise<void> {
  try {
    const result = await api.destroyAward(id);
  } catch (error) {
    console.log(error);
  }
}
</script>
