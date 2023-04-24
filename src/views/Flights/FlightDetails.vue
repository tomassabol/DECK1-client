<template>
  <div class="m-14 w-full">
    <PageTitle primaryText="Flight" :secondaryText="flight?.flightNumber" />
    <div class="flex flex-col gap-12 w-full mt-6" v-if="flight">
      <!-- Flight number -->
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div>
          <Label>Site</Label>
          <Input :value="flight.site.name" :isDisabled="true" />
        </div>
        <div>
          <Label>Pilot</Label>
          <Input :value="flight.pilot.name" :isDisabled="true" />
        </div>
        <div>
          <Label>Hoist Operator</Label>
          <Input :value="flight.hoistOperator.name" :isDisabled="true" />
        </div>
      </div>
      <!-- Flight number -->
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <!-- From -->
        <div class="flex flex-col gap-1">
          <Label>From</Label>
          <InputButton :isSelected="true" :isDisabled="true">
            {{ flight.from.name }}
          </InputButton>
        </div>
        <!-- From -->
        <!-- To -->
        <div class="flex flex-col gap-1">
          <Label>To</Label>
          <InputButton
            v-model="flight.to"
            :isSelected="true"
            :isDisabled="true"
          >
            {{ flight.to.name }}
          </InputButton>
        </div>
        <!-- To -->
      </div>
      <!-- Via -->
      <div class="flex flex-col gap-1">
        <Label>Via</Label>
        <div class="flex flex-wrap gap-x-10 gap-y-4">
          <div v-for="location in flight.via">
            <InputButton
              :isDisabled="true"
              :isSelected="true"
              :key="location.id"
            >
              {{ location.name }}
            </InputButton>
          </div>
        </div>
      </div>
      <!-- Via -->
      <!-- Time Input -->
      <div>
        <Label>Date</Label>
        <DateInput :value="flight.date" :isDisabled="true" />
      </div>

      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <TimeInput :value="timeFormat(flight.etd)" :isDisabled="true">
          ETD
        </TimeInput>
        <TimeInput :value="timeFormat(flight.rotorStart)" :isDisabled="true"
          >Rotor Start
        </TimeInput>
        <TimeInput :value="timeFormat(flight.etd)" :isDisabled="true">
          ETD
        </TimeInput>
      </div>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <TimeInput :value="timeFormat(flight.atd)" :isDisabled="true">
          ATD
        </TimeInput>
        <TimeInput :value="timeFormat(flight.rotorStop)" :isDisabled="true"
          >Rotor Stop
        </TimeInput>
        <TimeInput :value="timeFormat(flight.ata)" :isDisabled="true">
          ATA
        </TimeInput>
      </div>
      <!-- Time input -->
      <!-- Block and flight time -->
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div class="flex flex-col gap-1">
          <Label>Block Time</Label>
          <Input :value="flight.blockTime.toString()" :isDisabled="true" />
        </div>
        <div class="flex flex-col gap-1">
          <Label>Flight Time</Label>
          <Input :value="flight.flightTime.toString()" :isDisabled="true" />
        </div>
      </div>
      <!-- Block and flight time -->
      <!-- Delay -->
      <div class="flex gap-6 items-center">
        <Label>Delay</Label>
        <ToggleSwitch :modelValue="flight.delay" class="mt-1.5" />
        <span
          v-if="flight.delay === false"
          class="text-green-700 bg-green-50 p-2 px-3 rounded-md"
          >on time</span
        >
      </div>

      <div
        class="flex flex-wrap gap-x-10 gap-y-4"
        v-if="flight && flight.delay"
      >
        <div class="flex flex-col gap-1">
          <Label>Delay (min)</Label>
          <Input
            :value="flight.delayTime ? flight.delayTime.toString() : '0'"
            :isDisabled="true"
          />
        </div>
        <div class="flex flex-col gap-1">
          <Label>Delay Reason</Label>
          <select
            v-model="flight.delayCode"
            disabled
            class="border-2 border-gray-100 w-64 h-10 rounded-md text-lg"
          >
            <option value="" disabled>select a reason</option>
            <option value="A">A - Weather</option>
            <option value="B">B - GE Weather</option>
            <option value="C">C - PAX Late</option>
            <option value="D">D - Heli Crew</option>
            <option value="E">E - Ground Stop</option>
            <option value="F">F - Heli Technical</option>
            <option value="G">G - GE Reason</option>
            <option value="H">H - Others</option>
            <option value="I">I - Flight Canceled</option>
            <option value="J">J - Flight Aborted</option>
          </select>
        </div>
      </div>
      <!-- Delay -->
      <!-- Delay Description -->
      <div class="flex flex-col gap-1" v-if="flight && flight.delay">
        <Label>Delay Description</Label>
        <TextArea
          v-if="flight.delay"
          :value="flight.delayNote ? flight.delayNote : ''"
          :isDisabled="true"
        ></TextArea>
      </div>
      <!-- Delay Description -->
      <!-- PAX and Cargo -->
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div class="flex flex-col gap-1">
          <Label>PAX</Label>
          <Input :value="flight.pax.toString()" :isDisabled="true" />
        </div>
        <div class="flex flex-col gap-1">
          <Label>PAX TAX</Label>
          <Input :value="flight.paxTax.toString()" :isDisabled="true" />
        </div>
        <div class="flex flex-col gap-1">
          <Label>Cargo per Person</Label>
          <Input :value="flight.cargoPP.toString()" :isDisabled="true" />
        </div>
        <div class="flex flex-col gap-1">
          <Label>Hoist Cycles</Label>
          <Input :value="flight.hoistCycles.toString()" :isDisabled="true" />
        </div>
      </div>
      <div class="flex self-end gap-x-4">
        <BackButton @click="navigate" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import Input from "@/components/Input/Input.vue";
import InputButton from "@/components/Buttons/InputButton.vue";
import Label from "@/components/Headers/Label.vue";
import TimeInput from "@/components/Input/TimeInput.vue";
import Select from "@/components/Select/Select.vue";
import TextArea from "@/components/Input/TextArea.vue";
import BackButton from "@/components/Buttons/BackButton.vue";
import ToggleSwitch from "@/components/Input/ToggleSwitch.vue";
import { useRoute, useRouter } from "vue-router";
import { Ref, onBeforeMount } from "vue";
import { ref } from "@vue/reactivity";
import FlightService from "@/services/FlightService";
import { graphqlDateFormat, timeFormat } from "@/utils/dateFormat";
import DateInput from "@/components/Input/DateInput.vue";

const router = useRouter();
const route = useRoute();

const id = route.params.id;

const flight: Ref<Types.Flight | null> = ref(null);
const heliports: Ref<Types.Location[]> = ref([]);
const via: Ref<Types.Location[]> = ref([]);

onBeforeMount(() => {
  getFlight();
});

function getFlight() {
  const flightId = parseInt(id as string);
  FlightService.getFlight(flightId)
    .then((res) => {
      flight.value = res.data.data.flightById;
    })
    .finally(() => {
      getFlightDetails(flight.value?.site.id as number);
    });
}

function getFlightDetails(siteId: number) {
  FlightService.getFlightDetails(siteId)
    .then((res) => {
      heliports.value = res.data.data.heliportsPerSite;
      via.value = res.data.data.viaPerSite;
    })
    .catch((err) => {
      console.log(err);
    });
}

function navigate() {
  router.push({ name: "Flights" });
}
</script>
