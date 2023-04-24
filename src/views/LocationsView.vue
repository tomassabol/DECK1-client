<template>
  <div class="flex flex-col m-14 w-full">
    <div class="flex justify-between items-end">
      <PageTitle :primaryText="'Locations'" />
      <ButtonReusable text="New Location" @click.prevent="" />
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
        <TabButton
          id="tab-active"
          :selected="activeTab === 'other'"
          @click="activeTab = 'other'"
        >
          Other
          <span class="opacity-50">{{ via.length }}</span>
        </TabButton>
      </div>
    </div>
    <div class="flex flex-col gap-12 w-full mt-4">
      <Table :tableHeaders="tableHeaders">
        <TableRow
          v-for="location in tableData"
          :key="location.id"
          class="flex-auto bg-gray-50 hover:cursor-pointer text-center border-t border-slate-150 h-12"
        >
          <TableData>{{ location.id }}</TableData>
          <TableData>{{ location.name }}</TableData>
          <TableData v-if="activeTab === 'heliports'">
            {{
              //@ts-expect-error
              location.type
            }}
          </TableData>
          <TableData v-if="activeTab === 'other'">
            {{
              //@ts-expect-error
              location.lng
            }}
          </TableData>
          <TableData v-if="activeTab === 'other'">
            {{
              //@ts-expect-error
              location.lat
            }}
          </TableData>
          <TableData v-if="activeTab === 'other'">
            {{
              //@ts-expect-error
              location.type
            }}
          </TableData>
        </TableRow>
        <TableBody v-if="tableData.length === 0">
          <TableRow
            class="flex-auto bg-gray-50 text-center border-t border-slate-150 h-12"
          >
            <TableData colspan="3">No locations found</TableData>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import Table from "@/components/Tables/TableReusable.vue";
import TableBody from "@/components/Tables/TableBody.vue";
import TableRow from "@/components/Tables/TableRow.vue";
import TableData from "@/components/Tables/TableData.vue";
import { Ref, onBeforeMount, ref, watch } from "vue";
import TabButton from "@/components/Buttons/TabButton.vue";
import HeliportService from "@/services/HeliportService";
import router from "@/router";
import LocationService from "@/services/LocationService";

const isLoading = ref(false);
const isCreate = ref(false);
const isSuccess = ref(false);
const error = ref(false);
const errors = ref({
  errors: "",
});
const activeTab: Ref<"sites" | "heliports" | "other"> = ref("sites");

const tableHeaders: Ref<Types.TableHeader> = ref({});

const tableData: Ref<Types.Location[] | Types.Site[]> = ref([]);
const sites: Ref<Types.Site[]> = ref([]);
const heliports: Ref<Types.Location[]> = ref([]);
const via: Ref<Types.Location[]> = ref([]);

watch(activeTab, (newVal) => {
  if (newVal === "sites") {
    tableData.value = sites.value;
    tableHeaders.value = {
      id: "ID",
      name: "Name",
    };
  } else if (newVal === "heliports") {
    tableData.value = heliports.value;
    tableHeaders.value = {
      id: "ID",
      name: "Name",
      type: "Type",
    };
  } else {
    tableData.value = via.value;
    tableHeaders.value = {
      id: "ID",
      name: "Name",
      lng: "Longitude",
      lat: "Latitude",
      type: "Type",
    };
  }
});

onBeforeMount(() => {
  fetchData();
});
function fetchData() {
  LocationService.getLocations()
    .then((res) => {
      sites.value = res.data.data.sites;
      heliports.value = res.data.data.heliportsPerSite;
      via.value = res.data.data.viaPerSite;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      tableData.value = sites.value;
      tableHeaders.value = {
        id: "ID",
        name: "Name",
      };
    });
}
</script>
