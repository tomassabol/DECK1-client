<template>
  <div class="m-14 w-full">
    <PageTitle primaryText="Flight" />
    <form
      class="flex flex-col gap-12 w-full mt-6"
      @submit.prevent="createFlight"
    >
      <!-- Flight number -->
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div>
          <Label>Flight Number</Label>
          <Input v-model="newFlight.flightNumber" />
        </div>
        <div>
          <Label>Site</Label>
          <VueMultiselect
            v-model="flight.site"
            :options="sites"
            track-by="id"
            label="name"
            style="min-width: 16rem; max-width: 16rem"
          />
        </div>
      </div>
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div>
          <Label>Pilot</Label>
          <VueMultiselect
            v-model="flight.pilot"
            :options="pilots"
            label="name"
            track-by="id"
            style="width: 16rem"
          />
        </div>
        <div>
          <Label>Hoist Operator</Label>
          <VueMultiselect
            v-model="flight.hoistOperator"
            :options="hoistOperators"
            label="name"
            track-by="id"
            style="width: 16rem"
          />
        </div>
        <div>
          <Label>Helicopter</Label>
          <VueMultiselect
            v-model="flight.helicopter"
            :options="helicopters"
            label="model"
            track-by="id"
            style="width: 16rem"
          />
        </div>
      </div>
      <!-- Flight number -->
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <!-- From -->
        <div>
          <Label>From</Label>
          <VueMultiselect
            v-model="flight.from"
            :options="heliports"
            label="name"
            track-by="id"
            style="width: 16rem"
          />
        </div>
        <!-- From -->
        <!-- To -->
        <div>
          <Label>To</Label>
          <VueMultiselect
            v-model="flight.to"
            :options="heliports"
            label="name"
            track-by="id"
            style="width: 16rem"
          />
        </div>
        <!-- To -->
        <!-- Via -->
        <div>
          <Label>Via</Label>
          <VueMultiselect
            v-model="flight.via"
            :options="via"
            label="name"
            track-by="id"
            :multiple="true"
            :close-on-select="false"
            style="min-width: 16rem; max-width: 34.5rem"
          />
        </div>
        <!-- Via -->
      </div>
      <!-- Time Input -->
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div>
          <Label>Date</Label>
          <Input type="date" v-model="newFlight.date" />
        </div>
        <div>
          <Label>ETD</Label>
          <Input type="time" v-model="inputFlight.etd" />
        </div>
        <div>
          <Label>ETA</Label>
          <Input type="time" v-model="inputFlight.eta" />
        </div>
      </div>

      <!-- PAX and Cargo -->
      <div class="flex flex-wrap gap-x-10 gap-y-4">
        <div>
          <Label>PAX</Label>
          <Input type="number" v-model="newFlight.pax" />
        </div>
        <div>
          <Label>PAX TAX</Label>
          <Input type="number" v-model="newFlight.paxTax" :isDisabled="true" />
        </div>
        <div>
          <Label>Cargo per Person</Label>
          <Input type="number" v-model="newFlight.cargoPP" />
        </div>
        <div>
          <Label>Hoist Cycles</Label>
          <Input type="number" v-model="newFlight.hoistCycles" />
        </div>
      </div>
      <div class="flex self-end gap-x-4">
        <BackButton @click.prevent="goBack" />
        <ButtonReusable type="submit" text="Create Flight" />
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import Input from "@/components/Input/Input.vue";
import Label from "@/components/Headers/Label.vue";
import { useRouter } from "vue-router";
import { Ref, computed, onBeforeMount, watch } from "vue";
import { ref } from "@vue/reactivity";
import FlightService from "@/services/FlightService";
import VueMultiselect from "vue-multiselect";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import "vue-multiselect/dist/vue-multiselect.css";
import BackButton from "@/components/Buttons/BackButton.vue";
dayjs.extend(utc);

const router = useRouter();

const flight: Ref<Types.Flight> = ref({} as Types.Flight);
const inputFlight: Ref<Types.CreateFlight> = ref({} as Types.CreateFlight);
const newFlight: Ref<Types.CreateFlight> = ref({} as Types.CreateFlight);
const sites: Ref<Types.Site[]> = ref([]);
const heliports: Ref<Types.Location[]> = ref([]);
const helicopters: Ref<Types.Helicopter[]> = ref([]);
const via: Ref<Types.Location[]> = ref([]);
const pilots: Ref<Types.Pilot[]> = ref([]);
const hoistOperators: Ref<Types.HoistOperator[]> = ref([]);

// WATCHERS
watch(
  () => flight.value.site,
  (val) => {
    val === null
      ? (newFlight.value.siteId = null)
      : ((newFlight.value.siteId = val.id), getFlightOptions(val.id));
  }
);
watch(
  () => flight.value.from,
  (val) => {
    val === null
      ? (newFlight.value.fromId = null)
      : (newFlight.value.fromId = val.id);
  }
);
watch(
  () => flight.value.to,
  (val) => {
    val === null
      ? (newFlight.value.toId = null)
      : (newFlight.value.toId = val.id);
  }
);
watch(
  () => flight.value.via,
  (val) => {
    val === null
      ? (newFlight.value.viaIds = null)
      : (newFlight.value.viaIds = val.map((item) => item.id));
  }
);
watch(
  () => flight.value.pilot,
  (val) => {
    val === null
      ? (newFlight.value.pilotId = null)
      : (newFlight.value.pilotId = val.id);
  }
);
watch(
  () => flight.value.hoistOperator,
  (val) => {
    val === null
      ? (newFlight.value.hoistOperatorId = null)
      : (newFlight.value.hoistOperatorId = val.id);
  }
);
watch(
  () => flight.value.helicopter,
  (val) => {
    val === null
      ? (newFlight.value.helicopterId = null)
      : (newFlight.value.helicopterId = val.id);
  }
);

// COMPUTED
const paxTax = computed(() => {
  const tax: number = 10;
  if (newFlight.value.pax) newFlight.value.paxTax = newFlight.value.pax * tax;
  return newFlight.value.paxTax;
});

// LIFECYCLE HOOKS
onBeforeMount(() => {
  getData();
});

// FUNCTIONS

// FETCH
function getData() {
  FlightService.createFlightDataFetch()
    .then((res) => {
      sites.value = res.data.data.sites;
      pilots.value = res.data.data.pilots;
      hoistOperators.value = res.data.data.hoistOperators;
      helicopters.value = res.data.data.helicopters;
    })
    .catch((err) => {
      console.log(err);
    });
}
function getFlightOptions(siteId: number) {
  FlightService.getFlightDetails(siteId).then((res) => {
    heliports.value = res.data.data.heliportsPerSite;
    via.value = res.data.data.viaPerSite;
  });
}

function buildDateTime(date: string, time: string) {
  const timeArr = time.split(":");
  return dayjs
    .utc(date)
    .hour(parseInt(timeArr[0]))
    .minute(parseInt(timeArr[1]))
    .toISOString();
}

function prepareData() {
  newFlight.value.etd = buildDateTime(
    newFlight.value.date,
    inputFlight.value.etd
  );
  newFlight.value.eta = buildDateTime(
    newFlight.value.date,
    inputFlight.value.eta
  );
  newFlight.value.rotorStart = newFlight.value.etd;
  newFlight.value.atd = newFlight.value.etd;
  newFlight.value.rotorStop = newFlight.value.rotorStart;
  newFlight.value.ata = newFlight.value.eta;

  newFlight.value.blockTime = dayjs
    .utc(newFlight.value.rotorStop)
    .diff(dayjs.utc(newFlight.value.rotorStart), "minute");
  newFlight.value.flightTime = dayjs
    .utc(newFlight.value.ata)
    .diff(dayjs.utc(newFlight.value.atd), "minute");
}

// CREATE
function createFlight() {
  prepareData();
  FlightService.createFlight(newFlight.value)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// NAVIGATE
function goBack() {
  router.go(-1);
}
</script>
