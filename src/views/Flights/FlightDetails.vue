<template>
  <div class="flex flex-col gap-6 mx-14 my-14 w-4/5">
    <PageTitle primaryText="Flight" />
    <div class="flex flex-col gap-6 my-8">
      <div class="flex flex-col gap-1">
        <Label>Flight Number</Label>
        <Input v-model="flight.flightNumber" />
      </div>
      <div class="flex flex-col gap-1">
        <Label>From</Label>
        <div class="flex gap-16">
          <div v-for="airport in airports">
            <InputButton
              v-model="flight.from"
              :isSelected="flight.from === airport.name"
              :value="airport.name"
              :key="airport.id"
              @click="flight.from = airport.name"
            >
              {{ airport.name }}
            </InputButton>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <Label>Via</Label>
        <div class="flex gap-16">
          <!-- <InputButton v-for="site in otherSites">
            {{ site.name }}
          </InputButton> -->
          <div v-for="site in otherSites">
            <InputButton
              v-model="flight.via"
              :isSelected="flight.via === site.name"
              :value="site.name"
              :key="site.id"
              @click="flight.via = site.name"
            >
              {{ site.name }}
            </InputButton>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <Label>To</Label>
        <div class="flex gap-16">
          <div v-for="airport in airports">
            <InputButton
              v-model="flight.to"
              :isSelected="flight.to === airport.name"
              :value="airport.name"
              :key="airport.id"
              @click="flight.to = airport.name"
            >
              {{ airport.name }}
            </InputButton>
          </div>
        </div>
      </div>
      <div class="flex gap-16">
        <TimeInput>ETD</TimeInput>
        <TimeInput>Rotor Start</TimeInput>
        <TimeInput>ATD</TimeInput>
      </div>
      <div class="flex gap-16">
        <TimeInput>ETA</TimeInput>
        <TimeInput>Rotor Stop</TimeInput>
        <TimeInput>ATA</TimeInput>
      </div>
      <div class="flex gap-16">
        <div class="flex flex-col gap-1">
          <Label>Block Time</Label>
          <Input />
        </div>
        <div class="flex flex-col gap-1">
          <Label>Flight Time</Label>
          <Input />
        </div>
      </div>
      <div class="flex gap-16">
        <div class="flex flex-col gap-1">
          <Label>Delay</Label>
          <Input />
        </div>
        <div class="flex flex-col gap-1">
          <Label>Delay Reason</Label>
          <Select :options="options" />
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <Label>Delay Description</Label>
        <TextArea></TextArea>
      </div>
      <div class="flex gap-16">
        <div class="flex flex-col gap-1">
          <Label>PAX</Label>
          <Input />
        </div>
        <div class="flex flex-col gap-1">
          <Label>PAX TAX</Label>
          <Input />
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <Label>Cargo per Person</Label>
        <Input />
      </div>
      <div class="flex flex-col gap-1">
        <Label>Hoist Cycles</Label>
        <Input />
      </div>
    </div>
    <div class="flex self-end gap-4">
      <BackButton @click="navigate" />
      <ButtonReusable @click="navigate" />
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
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import BackButton from "@/components/Buttons/BackButton.vue";
import { useRouter } from "vue-router";
import { Ref, ref } from "vue";

const router = useRouter();

const airports: Types.Site[] = [
  {
    id: "1",
    name: "ESB",
  },
  {
    id: "2",
    name: "CPH",
  },
  {
    id: "3",
    name: "AAL",
  },
];
const otherSites: Types.OtherSite[] = [
  {
    id: "1",
    name: "B06",
  },
  {
    id: "2",
    name: "A32",
  },
  {
    id: "3",
    name: "B01",
  },
];
const options: String[] = ["Weather", "Technical", "Other"];

const flight: Ref<Types.Flight> = ref({
  flightNumber: "",
  from: "",
  via: "",
  to: "",
  etd: "",
  rotorStart: "",
  atd: "",
  eta: "",
  rotorStop: "",
  ata: "",
  blockTime: "",
  flightTime: "",
  delay: false,
  delayReason: "",
  delayDescription: "",
  pax: 0,
  paxTax: 0,
  cargoPerPerson: 0,
  hoistCycles: 0,
});

function navigate() {
  router.push({ name: "DailyReports" });
}
</script>
