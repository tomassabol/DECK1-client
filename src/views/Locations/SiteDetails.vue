<template>
  <div class="m-14 w-full">
    <div class="flex justify-between items-end">
      <PageTitle :primaryText="'Location'" :secondaryText="site?.name" />
    </div>
    <div class="flex flex-col gap-12 w-full mt-6" v-if="site">
      <div class="flex gap-6 flex-wrap">
        <div>
          <Label>ID</Label>
          <Input v-model="site.id" :isDisabled="true" />
        </div>
        <div>
          <Label>Name</Label>
          <Input v-model="site.name" :isDisabled="true" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <Label><span class="text-2xl">Locations</span></Label>
        <TableReusable :tableHeaders="tableHeaders">
          <TableRow
            v-for="location in site.locations"
            :key="location.id"
            @click.prevent="navigate(location.id)"
            class="flex-auto bg-gray-50 hover:cursor-pointer text-center border-t border-slate-150 h-12"
          >
            <TableData>{{ location.id }}</TableData>
            <TableData>{{ location.name }}</TableData>
            <TableData>{{ location.type }}</TableData>
          </TableRow>
          <TableBody v-if="site.locations && site.locations.length === 0">
            <TableRow
              class="flex-auto bg-gray-50 text-center border-t border-slate-150 h-12"
            >
              <TableData colspan="4">No locations found</TableData>
            </TableRow>
          </TableBody>
        </TableReusable>
      </div>
      <BackButton class="flex self-end" @click="navigateBack" />
    </div>
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import SiteService from "@/services/SiteService";
import Label from "@/components/Headers/Label.vue";
import Input from "@/components/Input/Input.vue";
import TableReusable from "@/components/Tables/TableReusable.vue";
import { Ref, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import TableRow from "@/components/Tables/TableRow.vue";
import TableData from "@/components/Tables/TableData.vue";
import BackButton from "@/components/Buttons/BackButton.vue";
import TableBody from "@/components/Tables/TableBody.vue";

const router = useRouter();
const route = useRoute();

const id = route.params.id as string;

const site: Ref<Types.Site | null> = ref(null);

const isLoading = ref(false);
const success = ref(false);
const error = ref(false);

onBeforeMount(() => {
  getSite();
});

function getSite() {
  isLoading.value = true;
  SiteService.getSite(id)
    .then((response) => {
      site.value = response.data.data.site;
      success.value = true;
    })
    .catch(() => {
      error.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
}

const navigateBack = () => {
  router.go(-1);
};
const navigate = (id: number | string) => {
  router.push({ name: "LocationDetails", params: { id } });
};

const tableHeaders: Ref<Types.TableHeader> = ref({
  id: "ID",
  name: "Name",
  type: "Type",
});
</script>
