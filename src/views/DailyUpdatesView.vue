<template>
  <div class="flex flex-col m-14 gap-12 w-full">
    <PageTitle :primaryText="title" />
    <div class="flex items-end justify-end">
      <ButtonReusable text="New Update" @click="navigate" />
    </div>
    <Table
      :tableHeaders="tableHeaders"
      :tableData="tableData"
      :updates="true"
    />
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import Table from "@/components/Tables/TableReusable.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const title = "Daily Updates";

const tableHeaders: Types.TableHeader = {
  flightNumber: "Flight Number",
  date: "Date",
  flight: "Flight",
  reason: "Reason",
  maintenance: "Maintenance",
  baseAndEquipment: "Base & Equipment",
};

const tableData: Types.UpdateSearch[] = [
  {
    id: "123",
    date: new Date("2023-02-14"),
    flight: true,
    reason: null,
    maintenance: true,
    baseAndEquipment: false,
  },
  {
    id: "124",
    date: new Date("2023-02-14"),
    flight: false,
    reason: null,
    maintenance: false,
    baseAndEquipment: false,
  },
];

function navigate() {
  router.push({ name: "DailyUpdate", params: { id: "124" } });
}
</script>
