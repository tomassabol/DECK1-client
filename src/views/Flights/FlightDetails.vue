<template>
  <div class="flex flex-col m-14 gap-12 w-full">
    <PageTitle primaryText="Flight" />
    <!-- From -->
    <div class="flex flex-col gap-1">
      <Label>From</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="heliport in heliports" v-if="heliports">
          <InputButton
            v-if="flight && heliports"
            v-model="flight.from"
            :isSelected="flight.from.name === heliport.name"
            :value="heliport.name"
            :key="heliport.id"
            :isDisabled="true"
          >
            {{ heliport.name }}
          </InputButton>
        </div>
      </div>
    </div>
    <!-- From -->
    <!-- Via -->
    <div class="flex flex-col gap-1">
      <Label>Via</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="site in sites">
          <InputButton
            v-model="flight.via"
            :isSelected="flight.via.name === site.name"
            :value="site.name"
            :key="site.id"
            :isDisabled="true"
          >
            {{ site.name }}
          </InputButton>
        </div>
      </div>
    </div>
    <!-- Via -->
    <!-- To -->
    <div class="flex flex-col gap-1">
      <Label>To</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="heliport in heliports">
          <InputButton
            v-model="flight.to"
            :isSelected="flight.to.name === heliport.name"
            :value="heliport.name"
            :key="heliport.id"
            :isDisabled="true"
          >
            {{ heliport.name }}
          </InputButton>
        </div>
      </div>
    </div>
    <!-- To -->
    <!-- Time Input -->
    <div class="flex flex-wrap gap-x-10 gap-y-4">
      <TimeInput :value="dayjs(flight.etd).format('HH:mm')" :isDisabled="true">
        ETD
      </TimeInput>
      <TimeInput
        :value="dayjs(flight.rotorStart).format('HH:mm')"
        :isDisabled="true"
        >Rotor Start
      </TimeInput>
      <TimeInput :value="dayjs(flight.atd).format('HH:mm')" :isDisabled="true">
        ATD
      </TimeInput>
    </div>
    <div class="flex flex-wrap gap-x-10 gap-y-4">
      <TimeInput :value="dayjs(flight.atd).format('HH:mm')" :isDisabled="true">
        ATD
      </TimeInput>
      <TimeInput
        :value="dayjs(flight.rotorStop).format('HH:mm')"
        :isDisabled="true"
        >Rotor Stop
      </TimeInput>
      <TimeInput :value="dayjs(flight.ata).format('HH:mm')" :isDisabled="true">
        ATA
      </TimeInput>
    </div>
    <!-- Time input -->
    <!-- Block and flight time -->
    <div class="flex flex-wrap gap-x-10 gap-y-4">
      <div class="flex flex-col gap-1">
        <Label>Block Time</Label>
        <Input
          :value="flight.blockTime.toString()"
          :isDisabled="true"
          v-if="flight.blockTime"
        />
      </div>
      <div class="flex flex-col gap-1">
        <Label>Flight Time</Label>
        <Input
          :value="flight.flightTime.toString()"
          :isDisabled="true"
          v-if="flight.blockTime"
        />
      </div>
    </div>
    <!-- Block and flight time -->
    <!-- Delay -->
    <div class="flex gap-6 items-center">
      <Label>Delay</Label>
      <ToggleSwitch
        :modelValue="flight.delay"
        class="mt-1.5"
        v-if="flight.delay"
      />
    </div>

    <div class="flex flex-wrap gap-x-10 gap-y-4" v-if="flight.delay">
      <div class="flex flex-col gap-1">
        <Label>Delay (min)</Label>
        <Input
          :value="flight.delayMin ? flight.delayMin.toString() : '0'"
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
        <Input
          :value="flight.pax.toString()"
          :isDisabled="true"
          v-if="flight.pax"
        />
      </div>
      <div class="flex flex-col gap-1">
        <Label>PAX TAX</Label>
        <Input
          :value="flight.paxTax.toString()"
          :isDisabled="true"
          v-if="flight.paxTax"
        />
      </div>
      <div class="flex flex-col gap-1">
        <Label>Cargo per Person</Label>
        <Input
          :value="flight.cargoPP.toString()"
          :isDisabled="true"
          v-if="flight.cargoPP"
        />
      </div>
      <div class="flex flex-col gap-1">
        <Label>Hoist Cycles</Label>
        <Input
          :value="flight.hoistCycles.toString()"
          :isDisabled="true"
          v-if="flight.hoistCycles"
        />
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
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { computed } from "@vue/reactivity";
import dayjs from "dayjs";

const router = useRouter();
const route = useRoute();

const id = route.params.id;

const { result } = useQuery(gql`
query {
  sites {
    id
    name
  }
  heliports {
    id
    name
  }
  flight(id: ${id}) {
    ata
    atd
    blockTime
    cargoPP
    delay
    delayCode
    delayDesc
    delayMin
    eta
    etd
    flightNumber
    flightTime
    hoistCycles
    id
    notes
    pax
    paxTax
    rotorStart
    rotorStop
    to {
      name
      id
    }
    via {
      id
      name
    }
    from {
      id
      name
    }
  }
}`);

const sites: Ref<Types.Site[]> = computed(() => result?.value?.sites ?? []);
const heliports: Ref<Types.Heliport[]> = computed(
  () => result?.value?.heliports ?? []
);
const flight: Ref<Types.Flight> = computed(() => result?.value?.flight ?? {});

function navigate() {
  router.push({ name: "DailyReports" });
}
</script>
