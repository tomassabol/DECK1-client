<template>
  <div class="flex flex-col m-14 gap-12 w-full">
    <div class="flex justify-between items-end">
      <PageTitle :primaryText="title" />
      <ButtonReusable
        text="New Report"
        @click="navigate"
        :loading="isLoading"
      />
    </div>
    <Table
      :tableHeaders="tableHeaders"
      :tableData="dailyReports"
      :reports="true"
    >
      <TableRow
        v-for="dailyReport in dailyReports"
        @click.prevent="redirect(dailyReport.id)"
        class="flex-auto bg-gray-50 hover:cursor-pointer text-center border-t border-slate-150 h-12"
      >
        <TableData>{{ dailyReport.id }}</TableData>
        <TableData>
          <span v-if="dailyReport.date">
            {{ dateFormat(dailyReport.date) }}
          </span>
          <span v-else>N/A</span>
        </TableData>
        <TableData>
          <span v-if="dailyReport.flights">
            {{ dailyReport.flights.length }}
          </span>
          <span v-else>N/A</span>
        </TableData>
      </TableRow>
      <TableBody v-if="dailyReports.length === 0">
        <TableRow
          class="flex-auto bg-gray-50 text-center border-t border-slate-150 h-12"
        >
          <TableData colspan="3">No Daily reports found</TableData>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
<script setup lang="ts">
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import PageTitle from "@/components/Headers/PageTitle.vue";
import Table from "@/components/Tables/TableReusable.vue";
import { Ref, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import ReportService from "@/services/ReportService";
import { dateFormat } from "@/utils/dateFormat";
import TableRow from "@/components/Tables/TableRow.vue";
import TableBody from "@/components/Tables/TableBody.vue";
import TableData from "@/components/Tables/TableData.vue";

const router = useRouter();

const title = "Daily Reports";
const isLoading = ref(false);

const dailyReports: Ref<Types.DailyReport[]> = ref([]);

const tableHeaders: Types.TableHeader = {
  id: "ID",
  date: "Date",
  flights: "Flights",
};

onBeforeMount(async () => {
  await getReports();
});

function getReports() {
  ReportService.getReports()
    .then((res) => {
      dailyReports.value = res.data.data.dailyReports;
    })
    .catch((err) => {
      console.log(err);
    });
}

function navigate() {
  router.push({ name: "NewDailyReport" });
}
function redirect(id: number) {
  router.push({ name: "DailyReport", params: { id: id } });
}
</script>
