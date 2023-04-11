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
            v-model="helicopterModel"
            :isSelected="
              DFR.helicopter === helicopter ||
              helicopterModel === helicopter.model
            "
            :value="helicopter.model"
            :key="helicopter.id"
            @click="
              (helicopterModel = helicopter.model) &&
                getHelicopter(helicopter.model)
            "
          >
            {{ helicopter.model }}
          </InputButton>
        </div>
      </div>
    </div>
    <!-- A/C Model -->
    <!-- A/C Registration -->
    <!-- TODO -->
    <div class="flex flex-col gap-1" v-if="helicoptersFiltered.length > 0">
      <Label>Helicopter Registration</Label>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="helicopter in helicoptersFiltered">
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
    <div class="flex w-full justify-between items-center">
      <div class="w-1/2">
        <div class="bg-green-100 text-green-700 rounded-md p-2" v-if="success">
          Daily Report was successfully created, you will be redirected
        </div>
        <div
          class="bg-red-100 text-red-700 rounded-md p-2"
          v-if="error.message"
        >
          {{ error.message }}
        </div>
        <div class="bg-red-100 text-red-700 rounded-md p-2" v-if="error.error">
          {{ error.error }}
        </div>
      </div>
      <div class="flex self-end gap-x-4">
        <BackButton @click="navigate" />
        <ButtonReusable :loading="isLoading" @click="createReport" />
      </div>
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
import { Ref, ref } from "vue";
import dayjs from "dayjs";
import ReportService from "@/services/ReportService";
import HelicopterService from "@/services/HelicopterService";

const router = useRouter();

const helicopters: Ref<Types.Helicopter[]> = ref([]);
const helicoptersFiltered: Ref<Types.Helicopter[]> = ref([]);
const pilots: Ref<Types.Pilot[]> = ref([]);
const hoistOperators: Ref<Types.HoistOperator[]> = ref([]);

const DFR: Ref<Types.CreateReport> = ref({
  helicopter: null,
  pilot: null,
  hoistOperator: null,
});
const date: Ref<string> = ref(dayjs().format("YYYY-MM-DD"));
const helicopterModel: Ref<string> = ref("");

const isLoading = ref(false);
const success = ref(false);
const error = ref({
  message: "",
  error: null,
});

fetchData();
function fetchData() {
  ReportService.createReportFetchData()
    .then((res) => {
      helicopters.value = res.data.data.helicopters;
      pilots.value = res.data.data.pilots;
      hoistOperators.value = res.data.data.hoistOperators;
    })
    .catch((err) => {
      console.log(err);
    });
}

function createReport() {
  isLoading.value = true;
  ReportService.createReport(DFR.value, dayjs(date.value).toDate())
    .then((res) => {
      console.log(res);
      if (res.data.errors) {
        error.value.message = "Something went wrong, please try again";
        return;
      }
      success.value = true;
    })
    .catch((err) => {
      console.log(err);
      error.value = err.data.errors[0].message;
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function getHelicopter(model: string) {
  helicoptersFiltered.value = [];
  HelicopterService.getHelicopterPerModel(model)
    .then((res) => {
      console.log(res);
      helicoptersFiltered.value = res.data.data.helicoptersWhereModel;
    })
    .catch((err) => {
      console.log(err);
    });
}

function navigate() {
  router.push({ name: "DailyReports" });
}
</script>
