<template>
  <div class="m-14 w-full">
    <PageTitle primaryText="New Daily Update" />
    <form
      class="flex flex-col gap-12 w-full mt-6"
      @submit.prevent="createDailyUpdate"
    >
      <div class="flex gap-12 items-start">
        <div class="flex gap-4 items-center">
          <Label>Was flight?</Label>
          <ToggleSwitch v-model="newDailyUpdate.wasFlight" />
        </div>
        <div v-if="newDailyUpdate.wasFlight" class="flex flex-col gap-1">
          <Label>Flight</Label>
          <VueMultiselect
            v-model="selectedFlight"
            :options="flights"
            track-by="id"
            label="flightNumber"
            style="min-width: 16rem; max-width: 16rem"
          />
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <div v-if="newDailyUpdate.wasFlight" class="flex gap-4 items-center">
          <Label>Delay</Label>
          <ToggleSwitch v-model="newDailyUpdate.delay" />
        </div>
        <div v-if="newDailyUpdate.delay" class="flex flex-col gap-2">
          <Label>Delay Code</Label>
          <VueMultiselect
            v-model="selectedDelayCode"
            :options="delayCodes"
            track-by="id"
            label="code"
            style="min-width: 16rem; max-width: 16rem"
          />
        </div>
        <div v-if="newDailyUpdate.delay" class="flex flex-col gap-1">
          <Label>Delay Time (min)</Label>
          <Input type="number" v-model="newDailyUpdate.delayTime" />
        </div>
        <div v-if="newDailyUpdate.delay" class="flex flex-col gap-1">
          <Label>Delay description</Label>
          <TextArea v-model="newDailyUpdate.delayDesc" />
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex gap-4 items-center">
          <Label>Maintenance</Label>
          <ToggleSwitch v-model="newDailyUpdate.maintenace" />
        </div>
        <div v-if="newDailyUpdate.maintenace" class="flex gap-4 items-center">
          <Label>Unplanned Maintenance</Label>
          <ToggleSwitch v-model="newDailyUpdate.unplannedMaintenance" />
        </div>
        <div v-if="newDailyUpdate.maintenace" class="flex gap-4 items-center">
          <Label>Planned Maintenance</Label>
          <ToggleSwitch v-model="newDailyUpdate.plannedMaintenance" />
        </div>
        <div v-if="newDailyUpdate.maintenace" class="flex gap-4 items-center">
          <Label>Other Maintenance</Label>
          <ToggleSwitch v-model="newDailyUpdate.otherMaintenance" />
        </div>
        <div v-if="newDailyUpdate.maintenace" class="flex flex-col gap-1">
          <Label>Maintenance note</Label>
          <TextArea v-model="newDailyUpdate.maintenanceNote" />
        </div>
      </div>

      <div class="flex gap-4">
        <Label>Base and Equipment</Label>
        <ToggleSwitch v-model="newDailyUpdate.baseAndEquipment" />
      </div>

      <div class="flex flex-col gap-1">
        <Label>Note</Label>
        <TextArea v-model="newDailyUpdate.note" />
      </div>
      <div class="flex self-end gap-x-4">
        <BackButton @click.prevent="goBack" />
        <ButtonReusable type="submit" text="Create Flight" />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import Label from "@/components/Headers/Label.vue";
import PageTitle from "@/components/Headers/PageTitle.vue";
import { Ref, onBeforeMount, ref, watch } from "vue";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import FLightService from "@/services/FlightService";
import ToggleSwitch from "@/components/Input/ToggleSwitch.vue";
import Input from "@/components/Input/Input.vue";
import TextArea from "@/components/Input/TextArea.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import BackButton from "@/components/Buttons/BackButton.vue";
import { useRouter } from "vue-router";
import DailyUpdateService from "@/services/DailyUpdateService";

const router = useRouter();

const newDailyUpdate: Ref<Types.CreateDailyUpdate> = ref({
  wasFlight: false,
  delay: false,
  maintenace: false,
  unplannedMaintenance: false,
  plannedMaintenance: false,
  otherMaintenance: false,
  baseAndEquipment: false,
} as Types.CreateDailyUpdate);

const flights: Ref<Types.Flight[]> = ref([]);
const selectedFlight: Ref<Types.Flight> = ref({} as Types.Flight);
const selectedDelayCode: Ref<Types.DelayCode> = ref({} as Types.DelayCode);

watch(
  () => selectedFlight.value,
  (newValue) => {
    newDailyUpdate.value.flightId = newValue.id;
  }
);
watch(
  () => selectedDelayCode.value,
  (newValue) => {
    newDailyUpdate.value.delayCode = newValue.code;
  }
);

onBeforeMount(() => {
  getFlights();
});
function getFlights() {
  FLightService.getFlightsMinimalData()
    .then((response) => {
      flights.value = response.data.data.flights as Types.Flight[];
    })
    .catch((error) => {
      console.log(error);
    });
}
function createDailyUpdate() {
  DailyUpdateService.createDailyUpdate(newDailyUpdate.value)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function goBack() {
  router.go(-1);
}

const delayCodes = [
  { id: 1, code: "A", description: "A - Air Traffic Control" },
  { id: 2, code: "B", description: "B - Weather" },
  { id: 3, code: "C", description: "C- Carrier" },
  { id: 4, code: "D", description: "D - National Aviation System" },
  { id: 5, code: "E", description: "E - Security" },
  { id: 6, code: "F", description: "F - Late Arriving Aircraft" },
  { id: 7, code: "G", description: "G - Other" },
  { id: 8, code: "H", description: "H - None" },
  { id: 9, code: "I", description: "I - Unknown" },
  { id: 10, code: "J", description: "J - Not Applicable" },
];
</script>
