<template>
  <div class="flex flex-col m-14 gap-12 w-full">
    <PageTitle primaryText="New Daily Report" />
    <!-- A/C Model -->
    <!-- TODO -->
    <div class="flex flex-col gap-1">
      <Label>Helicopter Model</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="helicopter in helicopters">
          <InputButton
            v-model="DFR.helicopter"
            :isSelected="DFR.helicopter === helicopter"
            :value="helicopter.model"
            :key="helicopter.id"
            @click="DFR.helicopter = helicopter"
          >
            {{ helicopter.model }}
          </InputButton>
        </div>
      </div>
    </div>
    <!-- A/C Model -->
    <!-- A/C Registration -->
    <!-- TODO -->
    <div class="flex flex-col gap-1">
      <Label>Helicopter Registration</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="helicopter in helicopters">
          <InputButton
            v-model="DFR.helicopter"
            :isSelected="DFR.helicopter === helicopter"
            :value="helicopter.reg"
            :key="helicopter.id"
            @click="DFR.helicopter = helicopter"
          >
            {{ helicopter.reg }}
          </InputButton>
        </div>
      </div>
    </div>
    <!-- A/C Registration -->
    <!-- Date -->
    <div class="flex flex-col gap-1">
      <Label>Date</Label>
      <input
        type="date"
        id="date"
        name="date"
        required
        v-model="date"
        class="border-2 border-gray-100 w-64 h-10 rounded-md text-lg text-center"
      />
    </div>
    <!-- Date -->
    <!-- Pilot -->
    <div class="flex flex-col gap-1">
      <Label>Pilot</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="pilot in pilots">
          <InputButton
            v-model="DFR.pilot"
            :isSelected="DFR?.pilot?.name === pilot.name"
            :value="pilot.name"
            :key="pilot.id"
            @click="DFR.pilot = pilot"
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
        <div v-for="hoistOperator in hoistOperators">
          <InputButton
            v-model="DFR.hoistOperator"
            :isSelected="DFR.hoistOperator === hoistOperator"
            :value="hoistOperator.name"
            :key="hoistOperator.id"
            @click="DFR.hoistOperator = hoistOperator"
          >
            {{ hoistOperator.name }}
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
import InputButton from "@/components/Buttons/InputButton.vue";
import Label from "@/components/Headers/Label.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import BackButton from "@/components/Buttons/BackButton.vue";
import { useRouter } from "vue-router";
import { Ref, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { computed } from "@vue/reactivity";
import dayjs from "dayjs";

const router = useRouter();

const DFR: Ref<Types.CreateReport> = ref({
  helicopter: null,
  pilot: null,
  hoistOperator: null,
});
const date: Ref<string> = ref(dayjs().format("YYYY-MM-DD"));

const { result } = useQuery(gql`
  query {
    helicopters {
      id
      model
      reg
    }
    pilots {
      id
      name
    }
    hoistOperators {
      name
      id
    }
  }
`);
const helicopters: Ref<Types.Helicopter[]> = computed(
  () => result.value?.helicopters ?? []
);
const pilots: Ref<Types.Pilot[]> = computed(() => result.value?.pilots ?? []);
const hoistOperators: Ref<Types.HoistOperator[]> = computed(
  () => result.value?.hoistOperators ?? []
);

function navigate() {
  router.push({ name: "DailyReports" });
}
</script>
