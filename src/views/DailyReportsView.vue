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
          <td>{{ dailyReport.helicopter.model }}</td>
          <td>{{ dailyReport.helicopter.reg }}</td>
          <td>{{ moment(dailyReport.date).format("MMMM Do YYYY") }}</td>
          <td>{{ dailyReport.pilot.name }}</td>
          <td>{{ dailyReport.hoistOperator.name }}</td>
        </tr>
      </template>
    </Table>
  </div>
</template>
<script setup lang="ts">
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import PageTitle from "@/components/Headers/PageTitle.vue";
import Table from "@/components/Tables/TableReusable.vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import moment from "moment";
import { Ref, computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const title = "Daily Reports";
const isLoading = ref(false);

// TODO: retrieve data from api
const tableHeaders: Types.TableHeader = {
  id: "ID",
  acModel: "A/C Model",
  acRegistration: "A/C Registration",
  date: "Date",
  pilot: "Pilot",
  hoistOperator: "Hoist Operator",
};

const { result } = useQuery(gql`
  query {
    dailyReports {
      id
      helicopter {
        model
        reg
      }
      date
      pilot {
        name
      }
      hoistOperator {
        name
      }
    }
  }
`);
const dailyReports: Ref<Types.Report[]> = computed(
  () => result?.value?.dailyReports ?? []
);

function navigate() {
  router.push({ name: "NewDailyReport" });
}
function redirect(id: number) {
  router.push({ name: "DailyReport", params: { id: id } });
}
</script>
