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
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed, ref, watch } from "vue";

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
  dailyUpdate: "Daily Update",
};
const tableData: Types.Report[] = [];

// graphql query
const ALL_REPORTS_QUERY = gql`
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
`;

const { result } = useQuery(ALL_REPORTS_QUERY);
const dailyReports = computed(() => result?.value?.dailyReports ?? []);

watch(dailyReports, () => {
  console.log(dailyReports.value);
});

function navigate() {
  router.push({ name: "NewDailyReport" });
}
</script>
