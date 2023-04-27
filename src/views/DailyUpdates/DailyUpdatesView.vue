<template>
  <div class="flex flex-col m-14 gap-12 w-full">
    <div class="flex justify-between items-end">
      <PageTitle primaryText="Daily Updates" />
      <ButtonReusable text="New Update" @click.prevent="navigate" />
    </div>
    <Table :tableHeaders="tableHeaders">
      <TableRow
        v-for="dailyUpdate in dailyUpdates"
        :key="dailyUpdate.id"
        class="flex-auto bg-gray-50 text-center border-t border-slate-150 h-12"
      >
        <TableData>{{ dailyUpdate.id }}</TableData>
        <TableData>{{ dailyUpdate.flight.flightNumber }}</TableData>
        <TableData>{{ dailyUpdate.flight.date }}</TableData>
        <TableData>{{ dailyUpdate.delay }}</TableData>
      </TableRow>
      <TableBody v-if="dailyUpdates.length === 0">
        <TableRow
          class="flex-auto bg-gray-50 text-center border-t border-slate-150 h-12"
        >
          <TableData colspan="4">No daily updates found</TableData>
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
import { Ref, onBeforeMount, ref } from "vue";
import DailyUpdateservice from "@/services/DailyUpdateService";

const router = useRouter();

const dailyUpdates: Ref<Types.DailyUpdate[]> = ref([]);

onBeforeMount(() => {
  getDailyUpdates();
});

const getDailyUpdates = async () => {
  DailyUpdateservice.getDailyUpdates()
    .then((response) => {
      dailyUpdates.value = response.data.data.dailyUpdates;
    })
    .catch((error) => {
      console.log(error);
    });
};

const tableHeaders: Types.TableHeader = {
  id: "ID",
  flightNumber: "Flight Number",
  date: "Date",
  delay: "Delay",
};

function navigate() {
  router.push({ name: "NewDailyUpdate" });
}
</script>
