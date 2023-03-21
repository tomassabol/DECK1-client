<template>
    <TableHeader :tableHeaders="tableHeaders" />
    <TableBody :tableData="tableData" />
</template>
<script setup lang="ts">
import TableHeader from "./TableHeader.vue";
import TableBody from "./TableBody.vue";

const props = defineProps<{
    tableHeaders: Types.TableHeader;
    tableData: Types.Report[] | Types.Update[] | Types.Flight[];
    tableReportData?: Types.Report[];
    tableUpdateData?: Types.Update[];
    tableFlightData?: Types.Flight[];
}>();
</script>
