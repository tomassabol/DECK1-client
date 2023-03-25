<template>
  <div class="flex flex-col gap-6 mx-14 my-14 w-4/5">
    <PageTitle primaryText="Flights" />
    <DFRDetails />
    <div class="flex items-end justify-end">
      <ButtonReusable text="New Flight" @click="navigate" />
    </div>
    <Table
      :tableHeaders="tableHeaders"
      :tableData="tableData"
      :flights="true"
    />
    <div class="flex items-end justify-end">
      <ButtonReusable
        text="Create Daily Update"
        :warningBtn="true"
        class="mt-4"
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

const router = useRouter();

// TODO: retrieve data from api
const tableHeaders: Types.TableHeader = {
  id: "Flight Number",
  from: "From",
  via: "Via",
  to: "To",
  ETD: "ETD",
  ATD: "ATD",
  ETA: "ETA",
  ATA: "ATA",
  delay: "Delay",
  Code: "Code",
};
const tableData: Types.FlightTable[] = [
  {
    id: "FR123",
    from: "LFRE",
    via: "B06",
    to: "LFRE",
    ETD: new Date("2023-02-14"),
    ATD: new Date("2023-02-14"),
    ETA: new Date("2023-02-14"),
    ATA: new Date("2023-02-14"),
    delay: "0",
    Code: "A",
  },
  {
    id: "FR124",
    from: "LFRE",
    via: "B02",
    to: "LFRE",
    ETD: new Date("2023-02-14"),
    ATD: new Date("2023-02-14"),
    ETA: new Date("2023-02-14"),
    ATA: new Date("2023-02-14"),
    delay: "0",
    Code: "B",
  },
];

function navigate() {
  router.push({ name: "Flight", params: { id: "124" } });
}
</script>
