<template>
  <div
    class="flex border border-gray-100 rounded-xl shadow-md w-full overflow-hidden"
  >
    <table class="w-full">
      <tr>
        <th v-for="header in tableHeaders" class="p-3">
          {{ header }}
        </th>
      </tr>
      <!-- <tr
        v-for="data in tableData"
        @click="redirect(data.id)"
        class="flex-auto bg-gray-50 hover:cursor-pointer text-center"
      >
        <td v-for="value in Object.values(data)" class="p-3">
          {{ isInstanceOf(value) ? value.toDateString() : value }}
        </td>
      </tr> -->
      <slot name="tableData"></slot>
    </table>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function redirect(id: any) {
  props.reports ? router.push({ name: "DailyReport", params: { id: id } }) : "";
  props.updates ? router.push({ name: "DailyUpdate", params: { id: id } }) : "";
  props.flights ? router.push({ name: "Flight", params: { id: id } }) : "";
}

const props = defineProps<{
  tableHeaders: Types.TableHeader;
  tableData: Types.Report[] | Types.UpdateSearch[] | Types.FlightTable[];
  reports?: boolean;
  updates?: boolean;
  flights?: boolean;
}>();

function isInstanceOf(value: any) {
  return value instanceof Date;
}
</script>
