<template>
  <div class="flex flex-col m-14 gap-12 w-full">
    <PageTitle primaryText="Flight" />
    <!-- From -->
    <div class="flex flex-col gap-1">
      <Label>From</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4" v-if="heliports && from">
        <InputButton
          v-for="heliport in heliports"
          v-model="from"
          :isSelected="from.name === heliport.name"
          :value="heliport.name"
          :key="heliport.id"
          @click.prevent="from = heliport"
        >
          {{ heliport.name }}
        </InputButton>
      </div>
    </div>
    <!-- From -->
    <!-- Via -->
    <div class="flex flex-col gap-1">
      <Label>Via</Label>
      <div class="w-1/3">
        <Multiselect
          v-if="sites"
          valueProp="id"
          v-model="via"
          mode="tags"
          :value="'name'"
          :label="'name'"
          :searchable="true"
          :closeOnSelect="false"
          :options="sites"
        />
      </div>
    </div>
    <!-- Via -->
    <!-- To -->
    <div class="flex flex-col gap-1">
      <Label>To</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4" v-if="to">
        <InputButton
          v-for="heliport in heliports"
          v-model="to"
          :value="heliport.name"
          :isSelected="to.name === heliport.name"
          :key="heliport.id"
          @click.prevent="to = heliport"
        >
          {{ heliport.name }}
        </InputButton>
      </div>
    </div>
    <!-- To -->
    <!-- Time Input -->
    <div class="flex flex-wrap gap-x-10 gap-y-4">
      <TimeInput :value="dayjs(etd).format('HH:mm')" :isDisabled="true">
        ETD
      </TimeInput>
      <TimeInput :value="dayjs(rotorStart).format('HH:mm')" :isDisabled="true"
        >Rotor Start
      </TimeInput>
      <TimeInput :value="dayjs(atd).format('HH:mm')" :isDisabled="true">
        ATD
      </TimeInput>
    </div>
    <div class="flex flex-wrap gap-x-10 gap-y-4">
      <TimeInput :value="dayjs(atd).format('HH:mm')" :isDisabled="true">
        ATD
      </TimeInput>
      <TimeInput :value="dayjs(rotorStop).format('HH:mm')" :isDisabled="true"
        >Rotor Stop
      </TimeInput>
      <TimeInput :value="dayjs(ata).format('HH:mm')" :isDisabled="true">
        ATA
      </TimeInput>
    </div>
    <!-- Time input -->
    <!-- Block and flight time -->
    <div class="flex flex-wrap gap-x-10 gap-y-4">
      <div class="flex flex-col gap-1">
        <Label>Block Time</Label>
        <Input :value="''" :isDisabled="true" />
      </div>
      <div class="flex flex-col gap-1">
        <Label>Flight Time</Label>
        <Input :value="''" :isDisabled="true" />
      </div>
    </div>
    <!-- Block and flight time -->
    <!-- Delay -->
    <div class="flex gap-6 items-center">
      <Label>Delay</Label>
      <ToggleSwitch
        :modelValue="flight.delay"
        class="mt-1.5"
        v-if="flight.delay != null"
      />
    </div>

    <div class="flex flex-wrap gap-x-10 gap-y-4" v-if="flight.delay">
      <div class="flex flex-col gap-1">
        <Label>Delay (min)</Label>
        <Input
          :value="''"
          :isDisabled="true"
          v-if="flight.delayMin != undefined"
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
    <div class="flex flex-col gap-1" v-if="flight.delay">
      <Label>Delay Description</Label>
      <TextArea
        v-if="flight.delay"
        :value="flight.delayDesc ? flight.delayDesc : ''"
        :isDisabled="true"
      ></TextArea>
    </div>
    <!-- Delay Description -->
    <!-- PAX and Cargo -->
    <div class="flex flex-wrap gap-x-10 gap-y-4">
      <div class="flex flex-col gap-1">
        <Label>PAX</Label>
        <Input :value="''" :isDisabled="true" v-if="flight.pax" />
      </div>
      <div class="flex flex-col gap-1">
        <Label>PAX TAX</Label>
        <Input :value="''" :isDisabled="true" v-if="flight.paxTax" />
      </div>
      <div class="flex flex-col gap-1">
        <Label>Cargo per Person</Label>
        <Input :value="''" :isDisabled="true" v-if="flight.cargoPP" />
      </div>
      <div class="flex flex-col gap-1">
        <Label>Hoist Cycles</Label>
        <Input :value="''" :isDisabled="true" v-if="flight.hoistCycles" />
      </div>
    </div>
    <div class="flex self-end gap-x-4">
      <BackButton @click="navigate" />
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
import { Ref } from "vue";
import { ref } from "@vue/reactivity";
import dayjs from "dayjs";
import Multiselect from "@vueform/multiselect";
import HeliportService from "@/services/HeliportService";
import SiteService from "@/services/SiteService";

const router = useRouter();
const route = useRoute();

const id = route.params.id;

const sites: Ref<Types.Site[]> = ref([]);
const heliports: Ref<Types.Heliport[]> = ref([]);
const flight = ref({
  id: 0,
  flightNumber: "",
  blockTime: 0,
  flightTime: 0,
  delay: false,
  delayMin: 0,
  delayCode: "",
  delayDesc: "",
  pax: 0,
  paxTax: 0,
  cargoPP: 0,
  hoistCycles: 0,
  notes: "",
  dailyReport: null,
  dailyUpdate: null,
});
const from: Ref<Types.Heliport> = ref({
  id: 0,
  name: "",
});
const via: Ref<Types.Site[]> = ref([]);
const to: Ref<Types.Heliport> = ref({
  id: 0,
  name: "",
});
const etd: Ref<string> = ref(dayjs().format("YYYY-MM-DD"));
const rotorStart: Ref<string> = ref(dayjs().format("YYYY-MM-DD"));
const atd: Ref<string> = ref(dayjs().format("YYYY-MM-DD"));
const eta: Ref<string> = ref(dayjs().format("YYYY-MM-DD"));
const rotorStop: Ref<string> = ref(dayjs().format("YYYY-MM-DD"));
const ata: Ref<string> = ref(dayjs().format("YYYY-MM-DD"));

HeliportService.getHeliports().then((res) => {
  heliports.value = res.data.data.heliports;
});
SiteService.getSites().then((res) => {
  sites.value = res.data.data.sites;
  console.log(sites.value);
});

function navigate() {
  router.push({ name: "DailyReports" });
}
</script>
<style>
@import url(@vueform/multiselect/themes/tailwind.css);
</style>
