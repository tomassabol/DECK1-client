<template>
  <div class="flex flex-col gap-6 mx-14 my-14 w-4/5">
    <PageTitle :primaryText="title" />
    <div class="flex items-end justify-end">
      <ButtonReusable text="New Update" />
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
</script>
