<template>
  <div class="flex flex-col m-14 gap-12 w-full">
    <PageTitle :primaryText="title" />
    <div class="flex items-end justify-end">
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
      <template #tableData>
        <tr
          v-for="dailyReport in dailyReports"
          @click="redirect(dailyReport.id)"
          class="flex-auto bg-gray-50 hover:cursor-pointer text-center border-t border-slate-150 h-12"
        >
          <td>{{ dailyReport.id }}</td>
          <td>
            <span v-if="dailyReport.helicopter">
              {{ dailyReport.helicopter.model }}
            </span>
            <span v-else>N/A</span>
          </td>
          <td>
            <span v-if="dailyReport.helicopter">
              {{ dailyReport.helicopter.reg }}
            </span>
            <span v-else>N/A</span>
          </td>
          <td>
            <span v-if="dailyReport.date">
              {{ dayjs(dailyReport.date).format("DD.MM.YYYY") }}
            </span>
            <span v-else>N/A</span>
          </td>
          <td>
            <span v-if="dailyReport.pilot">
              {{ dailyReport.pilot.name }}
            </span>
            <span v-else>N/A</span>
          </td>
          <td>
            <span v-if="dailyReport.hoistOperator">
              {{ dailyReport.hoistOperator.name }}
            </span>
            <span v-else>N/A</span>
          </td>
        </tr>
      </template>
    </Table>
  </div>
</template>
<script setup lang="ts">
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import PageTitle from "@/components/Headers/PageTitle.vue";
import Table from "@/components/Tables/TableReusable.vue";
import dayjs from "dayjs";
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";
import ReportService from "@/services/ReportService";

const router = useRouter();

const title = "Daily Reports";
const isLoading = ref(false);

const dailyReports: Ref<Types.Report[]> = ref([]);

const tableHeaders: Types.TableHeader = {
  id: "ID",
  acModel: "A/C Model",
  acRegistration: "A/C Registration",
  date: "Date",
  pilot: "Pilot",
  hoistOperator: "Hoist Operator",
};

getReports();
function getReports() {
  ReportService.getReports()
    .then((res) => {
      console.log(res);
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
