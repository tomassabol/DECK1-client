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
        @click="navigate"
        :loading="isLoading"
      />
      <ButtonReusable
        v-if="activeTab === 'heliports'"
        text="New Heliport"
        @click="navigate"
        :loading="isLoading"
      />
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
import { useRouter } from "vue-router";
import { Ref, ref } from "vue";
import SiteService from "@/services/SiteService";
import TabButton from "@/components/Buttons/TabButton.vue";
import HeliportService from "@/services/HeliportService";

const router = useRouter();

const isLoading = ref(false);
const activeTab: Ref<"sites" | "heliports"> = ref("sites");

const tableHeaders: Types.TableHeader = {
  id: "ID",
  name: "Name",
};

const sites: Ref<Types.Site[]> = ref([]);
const heliports: Ref<Types.Heliport[]> = ref([]);

getData();
function getData() {
  SiteService.getSites().then((response) => {
    sites.value = response.data.data.sites;
  });
  HeliportService.getHeliports().then((response) => {
    heliports.value = response.data.data.heliports;
  });
}

function navigate() {
  isLoading.value = true;
  router.push({ name: "NewDailyReport" });
}
</script>
