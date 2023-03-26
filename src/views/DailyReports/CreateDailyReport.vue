<template>
  <div class="flex flex-col m-14 gap-12">
    <PageTitle primaryText="New Daily Report" />
    <!-- Flight Number -->
    <div class="flex flex-wrap gap-x-10 gap-y-4">
      <div class="flex flex-col gap-1">
        <Label>Flight Number</Label>
        <Input />
      </div>
    </div>
    <!-- Flight Number -->
    <!-- A/C Model -->
    <div class="flex flex-col gap-1">
      <Label>A/C Model</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="helicopter in helicopters">
          <InputButton
            v-model="DFR.acModel"
            :isSelected="DFR.acModel === helicopter.model"
            :value="helicopter.model"
            :key="helicopter.id"
            @click="DFR.acModel = helicopter.model"
          >
            {{ helicopter.model }}
          </InputButton>
        </div>
      </div>
    </div>
    <!-- A/C Model -->
    <!-- A/C Registration -->
    <div class="flex flex-col gap-1">
      <Label>A/C Registration</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="helicopter in helicopters">
          <InputButton
            v-model="DFR.acRegistration"
            :isSelected="DFR.acRegistration === helicopter.registration"
            :value="helicopter.registration"
            :key="helicopter.id"
            @click="DFR.acRegistration = helicopter.registration"
          >
            {{ helicopter.registration }}
          </InputButton>
        </div>
      </div>
    </div>
    <!-- A/C Registration -->
    <!-- Date -->
    <div class="flex flex-col gap-1">
      <Label>Date</Label>
      <DateInput />
    </div>
    <!-- Date -->
    <!-- Pilot -->
    <div class="flex flex-col gap-1">
      <Label>Pilot</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="pilot in pilots">
          <InputButton
            v-model="DFR.pilot"
            :isSelected="DFR.pilot === pilot.name"
            :value="pilot.name"
            :key="pilot.id"
            @click="DFR.pilot = pilot.name"
          >
            {{ pilot.name }}
          </InputButton>
        </div>
      </div>
    </div>
    <!-- Pilot -->
    <!-- Hoist Operator -->
    <div class="flex flex-col gap-1">
      <Label>Hoist Operator</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="pilot in pilots">
          <InputButton
            v-model="DFR.hoistOperator"
            :isSelected="DFR.hoistOperator === pilot.name"
            :value="pilot.name"
            :key="pilot.id"
            @click="DFR.hoistOperator = pilot.name"
          >
            {{ pilot.name }}
          </InputButton>
        </div>
      </div>
    </div>
    <!-- Hoist Operator -->
    <div class="flex self-end gap-x-4">
      <BackButton @click="navigate" />
      <ButtonReusable @click="navigate" />
    </div>
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import Input from "@/components/Input/Input.vue";
import DateInput from "@/components/Input/DateInput.vue";
import InputButton from "@/components/Buttons/InputButton.vue";
import Label from "@/components/Headers/Label.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import BackButton from "@/components/Buttons/BackButton.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const DFR = ref({
  id: "",
  acModel: "",
  acRegistration: "",
  date: "",
  pilot: "",
  hoistOperator: "",
  dailyUpdate: false,
});

const helicopters: Types.Helicopter[] = [
  {
    id: "1",
    model: "Bell 206",
    registration: "N206",
  },
  {
    id: "2",
    model: "Bell 207",
    registration: "N207",
  },
  {
    id: "3",
    model: "Bell 208",
    registration: "N208",
  },
];

const pilots: Types.Pilot[] = [
  {
    id: "1",
    name: "Pilot 1",
  },
  {
    id: "2",
    name: "Pilot 2",
  },
  {
    id: "3",
    name: "Pilot 3",
  },
];

function navigate() {
  router.push({ name: "DailyReports" });
}
</script>
