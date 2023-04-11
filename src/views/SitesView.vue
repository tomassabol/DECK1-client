<template>
  <div class="flex flex-col m-14 gap-12 w-full">
    <div class="flex gap-4">
      <PageTitle :primaryText="'Locations'" />
    </div>
    <div class="flex justify-between w-100">
      <div class="flex gap-2">
        <TabButton
          id="tab-active"
          :selected="activeTab === 'sites'"
          @click="activeTab = 'sites'"
        >
          Sites
          <span class="opacity-50">{{ sites.length }}</span>
        </TabButton>
        <TabButton
          id="tab-active"
          :selected="activeTab === 'heliports'"
          @click="activeTab = 'heliports'"
        >
          Heliports
          <span class="opacity-50">{{ heliports.length }}</span>
        </TabButton>
      </div>
      <ButtonReusable
        v-if="activeTab === 'sites'"
        text="New Site"
        :loading="isLoading"
        @click.prevent="isCreate = !isCreate"
      />
      <ButtonReusable
        v-if="activeTab === 'heliports'"
        text="New Heliport"
        :loading="isLoading"
        @click.prevent="isCreate = !isCreate"
      />
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-3" v-if="activeTab === 'sites' && isCreate">
        <!-- <div v-if="isCreate"> -->
        <label class="font-medium text-xl">Enter Site Name</label>
        <input
          type="text"
          class="border-2 border-gray-100 w-64 h-10 rounded-md text-lg text-center"
          v-model="name"
        />
        <ButtonReusable
          :loading="isLoading"
          @click.prevent="createSite(name)"
        />
      </div>
      <div
        class="flex flex-col gap-3"
        v-if="activeTab === 'heliports' && isCreate"
      >
        <label class="font-medium text-xl">Enter Heliport Name</label>
        <input
          type="text"
          class="border-2 border-gray-100 w-64 h-10 rounded-md text-lg text-center"
          v-model="name"
        />
        <ButtonReusable
          :loading="isLoading"
          @click.prevent="createHeliport(name)"
        />
      </div>
      <div class="w-1/2">
        <div
          class="bg-green-100 text-green-700 rounded-md p-2 w-fit"
          v-if="isSuccess && activeTab === 'sites'"
        >
          Site was successfully created, you will be redirected
        </div>
        <div
          class="bg-green-100 text-green-700 rounded-md p-2 w-fit"
          v-if="isSuccess && activeTab === 'heliports'"
        >
          Heliport was successfully created, you will be redirected
        </div>
        <div
          class="bg-red-100 text-red-700 rounded-md p-2 w-fit"
          v-if="errors.errors.length > 0"
        >
          {{ errors.errors }}
        </div>
      </div>
    </div>
    <Table
      :tableHeaders="tableHeaders"
      :tableData="sites"
      :reports="true"
      v-if="activeTab === 'sites'"
    >
      <template #tableData>
        <tr
          v-for="site in sites"
          v-if="sites.length > 0"
          class="flex-auto bg-gray-50 hover:cursor-pointer text-center border-t border-slate-150 h-12"
        >
          <td>{{ site.id }}</td>
          <td>
            <span v-if="site">
              {{ site.name }}
            </span>
            <span v-else>N/A</span>
          </td>
        </tr>
        <tr v-else>
          <td colspan="2" class="text-center">No data available</td>
        </tr>
      </template>
    </Table>
    <Table
      :tableHeaders="tableHeaders"
      :tableData="sites"
      :reports="true"
      v-if="activeTab === 'heliports'"
    >
      <template #tableData>
        <tr
          v-for="heliport in heliports"
          v-if="heliports.length > 0"
          class="flex-auto bg-gray-50 hover:cursor-pointer text-center border-t border-slate-150 h-12"
        >
          <td>{{ heliport.id }}</td>
          <td>
            <span v-if="heliport">
              {{ heliport.name }}
            </span>
            <span v-else>N/A</span>
          </td>
        </tr>
        <tr v-else>
          <td colspan="2" class="text-center">No data available</td>
        </tr>
      </template>
    </Table>
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import Table from "@/components/Tables/TableReusable.vue";
import { Ref, ref } from "vue";
import SiteService from "@/services/SiteService";
import TabButton from "@/components/Buttons/TabButton.vue";
import HeliportService from "@/services/HeliportService";
import router from "@/router";

const isLoading = ref(false);
const isCreate = ref(false);
const isSuccess = ref(false);
const error = ref(false);
const errors = ref({
  errors: "",
});
const activeTab: Ref<"sites" | "heliports"> = ref("sites");

const tableHeaders: Types.TableHeader = {
  id: "ID",
  name: "Name",
};

const sites: Ref<Types.Site[]> = ref([]);
const heliports: Ref<Types.Heliport[]> = ref([]);

const name: Ref<string> = ref("");

getData();
function getData() {
  SiteService.getSites().then((response) => {
    sites.value = response.data.data.sites;
  });
  HeliportService.getHeliports().then((response) => {
    heliports.value = response.data.data.heliports;
  });
}

function createSite(name: string) {
  isLoading.value = true;
  if (name === "") {
    errors.value.errors = "Please enter a name";
    isLoading.value = false;
    return;
  }
  SiteService.createSite(name).then((response) => {
    console.log(response);
    if (response.data.data.createSite) {
      isSuccess.value = true;
    }
    if (response.data.data.errors) {
      error.value = true;
      errors.value.errors = "Something went wrong";
    }
  });
  setTimeout(() => {
    isCreate.value = false;
    isLoading.value = false;
    router.go(0);
  }, 5000);
}
function createHeliport(name: string) {
  isLoading.value = true;
  if (name === "") {
    errors.value.errors = "Please enter a name";
    isLoading.value = false;
    return;
  }
  HeliportService.createHeliport(name).then((response) => {
    console.log(response);
    if (response.data.data.createHeliport) {
      isSuccess.value = true;
    }
    if (response.data.data.errors) {
      error.value = true;
      errors.value.errors = "Something went wrong";
    }
  });
  setTimeout(() => {
    isCreate.value = false;
    isLoading.value = false;
    router.go(0);
  }, 5000);
}
</script>
