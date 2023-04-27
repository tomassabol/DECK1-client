<template>
  <div class="m-14 w-full">
    <PageTitle
      :primaryText="'New location'"
      class="flex justify-between items-end"
    />
    <div class="flex flex-col gap-12 w-full mt-6">
      <div>
        <Label>Location Type</Label>
        <VueMultiselect
          v-model="selectedType"
          :options="locationTypes"
          style="min-width: 16rem; max-width: 16rem"
        />
      </div>

      <form
        v-if="selectedType === 'SITE'"
        class="flex flex-col gap-y-4"
        @submit.prevent="createSite"
      >
        <div>
          <Label>Name</Label>
          <Input v-model="newSite.name" />
        </div>
        <ButtonReusable :primaryText="'Submit'" type="submit" />
      </form>

      <form
        v-else-if="
          selectedType === 'HELIPORT' ||
          selectedType === 'AIRPORT' ||
          selectedType === 'VIA'
        "
        @submit.prevent="createLocation"
        class="flex flex-col gap-y-4"
      >
        <div>
          <Label>Name</Label>
          <Input v-model="newLocation.name" />
        </div>
        <div class="flex flex-col gap-x-6">
          <Label><span class="text-2xl">Coordinates</span></Label>
          <div class="flex flex-wrap gap-x-6">
            <div>
              <Label>Latitude</Label>
              <Input v-model="newLocation.lat" />
            </div>
            <div>
              <Label>Longitude</Label>
              <Input v-model="newLocation.lng" />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <Label>Site</Label>
          <VueMultiselect
            v-model="selectedHeliport"
            :options="sites"
            track-by="id"
            label="name"
            style="min-width: 16rem; max-width: 16rem"
          />
        </div>
        <ButtonReusable :primaryText="'Submit'" type="submit" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import { Ref, onBeforeMount, ref, watch } from "vue";
import Label from "@/components/Headers/Label.vue";
import Input from "@/components/Input/Input.vue";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
import LocationService from "@/services/LocationService";

const selectedType: Ref<string | null> = ref(null);
const newSite: Ref<Types.CreateSite> = ref({} as Types.Site);

const selectedHeliport: Ref<Types.Location | null> = ref(null);
const newLocation: Ref<Types.CreateLocation> = ref({} as Types.CreateLocation);

const sites: Ref<Types.Site[]> = ref([]);

const locationTypes: string[] = ["HELIPORT", "AIRPORT", "VIA", "SITE"];

watch(
  () => selectedHeliport.value,
  (val) => {
    if (val) {
      newLocation.value.siteId = val.id;
    }
  }
);
watch(
  () => selectedType.value,
  (val) => {
    if (val && (val === "HELIPORT" || val === "AIRPORT" || val === "VIA"))
      newLocation.value.type = val;
  }
);

onBeforeMount(() => {
  getSites();
});
function getSites() {
  LocationService.getSites()
    .then((res) => {
      sites.value = res.data.data.sites;
    })
    .catch((err) => {
      console.log(err);
    });
}

function createSite() {
  LocationService.createSite(newSite.value)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
function createLocation() {
  LocationService.createLoaction(newLocation.value)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
