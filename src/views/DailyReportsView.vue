<template>
  <div class="flex flex-col m-14 gap-12 w-full">
    <PageTitle :primaryText="title" />
    <div class="flex items-end justify-end">
      <ButtonReusable text="New Report" @click="navigate" />
    </div>
    <Table
      :tableHeaders="tableHeaders"
      :tableData="tableData"
      :reports="true"
    />
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import Table from "@/components/Tables/TableReusable.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const title = "Daily Reports";

// TODO: retrieve data from api
const tableHeaders: Types.TableHeader = {
  id: "ID",
  acModel: "A/C Model",
  acRegistration: "A/C Registration",
  date: "Date",
  pilot: "Pilot",
  hoistOperator: "Hoist Operator",
  dailyUpdate: "Daily Update",
};
const tableData: Types.Report[] = [
  {
    id: "123",
    acModel: "EC 145",
    acRegistration: "D-HTMK",
    date: new Date("2023-02-14"),
    pilot: "SRO",
    hoistOperator: "BRA",
    dailyUpdate: true,
  },
  {
    id: "124",
    acModel: "EC 145",
    acRegistration: "D-HTMK",
    date: new Date("2023-02-14"),
    pilot: "SRO",
    hoistOperator: "BRA",
    dailyUpdate: true,
  },
];

function navigate() {
  router.push({ name: "NewDailyReport" });
}
</script>
