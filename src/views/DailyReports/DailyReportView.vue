<template>
  <div class="flex flex-col m-14 gap-8 w-full">
    <div>
      <PageTitle primaryText="Flights">
        <span class="text-xl font-medium">
          for daily report nr. {{ dailyReport.id }}
        </span>
      </PageTitle>
      <DFRDetails :dailyReport="dailyReport" v-if="dailyReport.id" />
      <div class="flex items-end justify-end">
        <ButtonReusable
          :loading="isLoading"
          text="New Flight"
          @click="navigate"
        />
      </div>
    </div>
    <Table :tableHeaders="tableHeaders">
      <template #tableData>
        <tr
          v-if="flights.length > 0"
          v-for="flight in flights"
          @click="redirect(flight.id)"
          class="flex-auto bg-gray-50 hover:cursor-pointer text-center border-t border-slate-150 h-12"
        >
          <td>{{ flight.flightNumber }}</td>
          <td>{{ flight.from.name }}</td>
          <td>{{ flight.to.name }}</td>
          <td>{{ dayjs(flight.etd).format("HH:mm") }}</td>
          <td>{{ dayjs(flight.atd).format("HH:mm") }}</td>
          <td>{{ dayjs(flight.eta).format("HH:mm") }}</td>
          <td>{{ dayjs(flight.ata).format("HH:mm") }}</td>
          <td>
            <div
              v-if="flight.delay"
              class="bg-red-100 text-red-700 py-1 rounded-md"
            >
              <span>DELAYED</span>
            </div>
            <div v-else class="bg-green-100 text-green-700 py-1 rounded-md">
              <span>ON TIME</span>
            </div>
          </td>
          <td>{{ flight.delayCode }}</td>
        </tr>
        <tbody v-else>
          <tr
            class="flex-auto bg-gray-50 text-center border-t border-slate-150 h-12"
          >
            <td colspan="9">No flights found</td>
          </tr>
        </tbody></template
      >
    </Table>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import DFRDetails from "@/components/DFR/DFRDetails.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import Table from "@/components/Tables/TableReusable.vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { Ref, ref } from "vue";
import ReportService from "@/services/ReportService";

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const isLoading = ref(false);

const tableHeaders: Types.TableHeader = {
  id: "Flight Number",
  from: "From",
  to: "To",
  ETD: "ETD",
  ATD: "ATD",
  ETA: "ETA",
  ATA: "ATA",
  delay: "Delay",
  Code: "Code",
};

const dailyReport: Ref<Types.Report> = ref({
  id: 0,
  date: null,
  helicopter: null,
  pilot: null,
  hoistOperator: null,
});
const flights: Ref<Types.Flight[]> = ref([]);

ReportService.getReport(id.toString()).then((res) => {
  console.log(res);
  dailyReport.value = res.data.data.dailyReport;
  flights.value = res.data.data.flightWhereDailyReportId;
});

function navigate() {
  isLoading.value = true;
  router.push({ name: "NewFlight" });
}
function redirect(id: number) {
  router.push({ name: "Flight", params: { id } });
}
</script>
