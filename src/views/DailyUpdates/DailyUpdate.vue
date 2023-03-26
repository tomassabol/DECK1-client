<template>
  <div class="flex flex-col gap-6 mx-14 my-14 w-4/5">
    <PageTitle :primaryText="'Daily Update'" />
    <div class="flex flex-col gap-1">
      <Label>Flight on this day:</Label>
      <div class="flex gap-3 flex-wrap">
        <InputButton :isSelected="true" @click="update.flight = true">
          Yes
        </InputButton>
        <InputButton
          v-model="update.flight"
          :isSelected="true"
          :value="false"
          @click="update.flight = false"
          >No
        </InputButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import Label from "@/components/Headers/Label.vue";
import InputButton from "@/components/Buttons/InputButton.vue";
import { ref, Ref } from "vue";

const reasons: string[] = [
  "Weather",
  "PAX late",
  "Crew",
  "Refueling",
  "ATC",
  "A/C late",
  "Technics",
  "Other",
];

const update: Ref<Types.Update> = ref({
  id: "",
  date: "",
  flight: false,
  reason: "",
  maintenance: false,
  plannedMaintenance: false,
  unplannedMaintenance: false,
  baseAndEquipment: false,
});
</script>
