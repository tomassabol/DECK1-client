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
        <ButtonReusable text="New Flight" @click="navigate" />
      </div>
    </div>
    <Table :tableHeaders="tableHeaders">
      <template #tableData>
        <tr
          v-if="flights"
          v-for="flight in flights"
          @click="redirect(flight.id)"
          class="flex-auto bg-gray-50 hover:cursor-pointer text-center border-t border-slate-150 h-12"
        >
          <td>{{ flight.flightNumber }}</td>
          <td>{{ flight.from.name }}</td>
          <td>{{ flight.to.name }}</td>
          <td>{{ moment(flight.etd).format("MMMM Do YYYY") }}</td>
          <td>{{ moment(flight.atd).format("MMMM Do YYYY") }}</td>
          <td>{{ moment(flight.eta).format("MMMM Do YYYY") }}</td>
          <td>{{ moment(flight.ata).format("MMMM Do YYYY") }}</td>
          <td>
            <div
              v-if="flight.delay"
              class="bg-red-100 text-red-700 py-1 rounded-md"
            >
              <span>{{ flight.delay }}</span>
            </div>
            <div v-else class="bg-green-100 text-green-700 py-1 rounded-md">
              <span>ON TIME</span>
            </div>
          </td>
          <td>{{ flight.delayCode }}</td>
        </tr>
      </template>
    </Table>
    <div class="flex items-end justify-end">
      <ButtonReusable
        text="Create Daily Update"
        :warningBtn="true"
        class="mt-4"
        @click="newDailyUpdate"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import DFRDetails from "@/components/DFR/DFRDetails.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import Table from "@/components/Tables/TableReusable.vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import moment from "moment";
import { Ref, computed, watch } from "vue";

const router = useRouter();
const route = useRoute();
const id = route.params.id;

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

// TODO: Add a query for flights per specific DFR
const { result } = useQuery(gql`
  query MyQuery {
    dailyReport(id: ${id}) {
      date
      helicopter {
        model
        reg
      }
      hoistOperator {
        name
      }
      id
      pilot {
        name
      }
    }
    flights {
      id
      flightNumber
      from {
        name
      }
      to {
        name
      }
      etd
      atd
      ata
      eta
      delay
      delayCode
    }
  }
`);
const dailyReport: Ref<Types.Report> = computed(
  () => result?.value?.dailyReport ?? []
);
const flights: Ref<Types.Flight[]> = computed(
  () => result?.value?.flights ?? []
);

watch(dailyReport, () => {
  console.log(dailyReport.value);
  console.log(flights.value);
});

function navigate() {
  router.push({ name: "NewFlight" });
}
function redirect(id: number) {
  router.push({ name: "Flight", params: { id } });
}
function newDailyUpdate() {
  router.push({ name: "NewDailyUpdate" });
}
</script>
