<template>
  <div class="flex flex-col m-14 gap-12 w-full">
    <div class="flex justify-between items-end">
      <PageTitle
        primaryText="Flights"
        secondaryText="for date"
        class="flex flex-col gap-0.5"
      >
        <input
          type="date"
          id="date"
          name="date"
          v-model="searchDate"
          class="border-2 border-gray-100 w-64 h-10 rounded-md text-lg text-center"
        />
        <div class="flex gap-2 mt-2">
          <ButtonReusable
            text="Search"
            :loading="isLoading.flights"
            @click.prevent="fetchFlights"
          />
          <BackButton text="Reset" @click.prevent="resetFlights" />
        </div>
      </PageTitle>
      <ButtonReusable text="New Flight" @click.prevent="notImplemented" />
    </div>
    <Table :tableHeaders="tableHeaders" :tableData="flights">
      <TableRow
        v-for="flight in flights"
        :key="flight.id"
        @click.prevent="navigate(flight.id)"
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
      <TableBody v-if="flights.length === 0">
        <TableRow
          class="flex-auto bg-gray-50 text-center border-t border-slate-150 h-12"
        >
          <TableData colspan="7">No flights found</TableData>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import Table from "@/components/Tables/TableReusable.vue";
import TableBody from "@/components/Tables/TableBody.vue";
import TableRow from "@/components/Tables/TableRow.vue";
import TableData from "@/components/Tables/TableData.vue";
import { useRouter } from "vue-router";
import FlightService from "@/services/FlightService";
import { Ref, onBeforeMount, ref } from "vue";
import TimeFormat from "@/components/Helpers/TimeFormat.vue";
import { graphqlDateFormat } from "@/utils/dateFormat";
import BackButton from "@/components/Buttons/BackButton.vue";

const router = useRouter();

const flights: Ref<Types.Flight[]> = ref([]);

const searchDate: Ref<string> = ref(graphqlDateFormat(new Date()));

const isLoading = ref({
  flights: false,
});
const response = ref({
  success: false,
  error: false,
});

onBeforeMount(() => {
  fetchFlights();
});

function fetchFlights() {
  flights.value = [];
  isLoading.value.flights = true;
  FlightService.getFlightsPerDate(graphqlDateFormat(searchDate.value))
    .then((res) => {
      flights.value = res.data.data.flightsPerDay;
      isLoading.value.flights = false;
      response.value.success = true;
      setTimeout(() => {
        response.value.success = false;
      }, 8000);
    })
    .catch((err) => {
      isLoading.value.flights = false;
      response.value.error = true;
      setTimeout(() => {
        response.value.error = false;
      }, 8000);
    });
}

function resetFlights() {
  flights.value = [];
  searchDate.value = graphqlDateFormat(new Date());
  fetchFlights();
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

function navigate(id: number) {
  router.push({ name: "FlightDetails", params: { id } });
}
function redirect() {}

function notImplemented() {
  alert("Not implemented yet");
}
</script>
