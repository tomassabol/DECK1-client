<template>
  <div class="m-14 w-full">
    <div class="flex justify-between items-end">
      <PageTitle :primaryText="'Location'" :secondaryText="location?.name" />
    </div>
    <div class="flex flex-col gap-12 w-full mt-6" v-if="location">
      <div>
        <Label>ID</Label>
        <Input :value="location.id" :isDisabled="true" />
      </div>
      <div>
        <Label>Name</Label>
        <Input :value="location.name" :isDisabled="true" />
      </div>
      <div>
        <Label>Coordinates</Label>
        <div class="flex gap-x-6">
          <Input :value="location.lat" :isDisabled="true" />
          <Input :value="location.lng" :isDisabled="true" />
        </div>
      </div>
      <div>
        <Label>Type</Label>
        <Input :value="location.type" :isDisabled="true" />
      </div>
      <div>
        <Label><span class="text-2xl">Site</span></Label>
        <div class="flex flex-wrap gap-6">
          <div class="flex flex-col">
            <Label>ID</Label>
            <Input :value="location.site.id" :isDisabled="true" />
          </div>
          <div class="flex flex-col">
            <Label>Name</Label>
            <Input :value="location.site.name" :isDisabled="true" />
          </div>
        </div>
      </div>
      <BackButton class="flex self-end" @click.prevent="navigate" />
    </div>
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import LocationService from "@/services/LocationService";
import Label from "@/components/Headers/Label.vue";
import Input from "@/components/Input/Input.vue";
import { Ref, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackButton from "@/components/Buttons/BackButton.vue";

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const location: Ref<Types.Location | null> = ref(null);

const isLoading = ref(false);
const success = ref(false);
const error = ref(false);

onBeforeMount(() => {
  getLocation();
});

function getLocation() {
  isLoading.value = true;
  LocationService.getLocation(id)
    .then((response) => {
      location.value = response.data.data.location;
      success.value = true;
    })
    .catch((error) => {
      error.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function navigate() {
  router.go(-1);
}
</script>
