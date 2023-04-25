<template>
  <div class="m-14 w-full">
    <div class="flex justify-between items-end">
      <PageTitle
        :primaryText="'Daily Report'"
        :secondaryText="
          dailyReport && dailyReport.date ? dateFormat(dailyReport.date) : ''
        "
      />
    </div>
    <div class="flex flex-col gap-12 w-full mt-6" v-if="dailyReport">
      <div class="flex gap-6">
        <div>
          <Label>ID</Label>
          <Input :value="dailyReport.id" :isDisabled="true" />
        </div>
        <div>
          <Label>Date</Label>
          <DateInput :value="dailyReport.date" :isDisabled="true" />
        </div>
      </div>
      <TableReusable
        :tableHeaders="tableHeaders"
        :tableData="dailyReport.flights"
      >
        <TableRow
          v-for="flight in flights"
          :key="flight.id"
          @click.prevent="redirect(flight.id)"
          class="flex-auto bg-gray-50 hover:cursor-pointer text-center border-t border-slate-150 h-12"
        >
          <TableData>{{ flight.flightNumber }}</TableData>
          <TableData>{{ flight.from.name }} </TableData>
          <TableData>
            {{ flight.to.name }}
          </TableData>
          <TableData>
            <TimeFormat :time="flight.eta" />
          </TableData>
          <TableData>
            <TimeFormat :time="flight.etd" />
          </TableData>
          <TableData>
            {{ flight.site.name }}
          </TableData>
          <TableData>
            <span
              v-if="flight.delay === false"
              class="bg-green-100 text-green-700 p-1 px-3 rounded-md"
              >on time</span
            >
            <span v-else class="bg-red-100 text-red-700 p-1 px-3 rounded-md"
              >delayed</span
            >
          </TableData>
        </TableRow>
        <TableBody v-if="flights && flights.length === 0">
          <TableRow
            class="flex-auto bg-gray-50 text-center border-t border-slate-150 h-12"
          >
            <TableData colspan="7">No flights found</TableData>
          </TableRow>
        </TableBody>
      </TableReusable>
      <BackButton @click.prevent="navigateBack" class="flex self-end" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import TableReusable from "@/components/Tables/TableReusable.vue";
import Label from "@/components/Headers/Label.vue";
import Input from "@/components/Input/Input.vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { Ref, onBeforeMount, ref } from "vue";
import ReportService from "@/services/DailyReportService";
import { dateFormat, graphqlDateFormat } from "@/utils/dateFormat";
import DateInput from "@/components/Input/DateInput.vue";
import TableRow from "@/components/Tables/TableRow.vue";
import TableData from "@/components/Tables/TableData.vue";
import TableBody from "@/components/Tables/TableBody.vue";
import TimeFormat from "@/components/Helpers/TimeFormat.vue";
import FlightService from "@/services/FlightService";
import BackButton from "@/components/Buttons/BackButton.vue";

const router = useRouter();
const route = useRoute();
const id = route.params.id as string;

const isLoading = ref(false);
const success = ref(false);
const error = ref(false);

const dailyReport: Ref<Types.DailyReport | null> = ref(null);
const flights: Ref<Types.Flight[] | null> = ref(null);

onBeforeMount(() => {
  getDailyReport();
});

function getDailyReport() {
  ReportService.getReport(id)
    .then((res) => {
      dailyReport.value = res.data.data.dailyReportsById;
      success.value = true;
    })
    .catch((err) => {
      error.value = true;
    })
    .finally(() => {
      isLoading.value = false;
      if (dailyReport.value && dailyReport.value.date) {
        getFlights(dailyReport.value.date);
      }
    });
}

function getFlights(date: Date) {
  FlightService.getFlightsPerDate(graphqlDateFormat(date))
    .then((res) => {
      flights.value = res.data.data.flightsPerDay;
      success.value = true;
    })
    .catch((err) => {
      console.log(err);
      error.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function navigateBack() {
  router.go(-1);
}
function redirect(id: number) {
  router.push({ name: "FlightDetails", params: { id } });
}

const tableHeaders: Types.TableHeader = {
  flightNumber: "Flight Number",
  from: "From",
  to: "To",
  ETA: "ETA",
  ETD: "ETD",
  site: "Site",
  delay: "Delay",
};
</script>
