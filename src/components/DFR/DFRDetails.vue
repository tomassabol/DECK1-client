<template>
  <div class="border-y mt-6 w-fit py-4">
    <h2 class="font-semibold text-xl">Details</h2>
    <div class="flex gap-10 items-center mt-4">
      <div>
        <div class="flex gap-4">
          <h3 class="font-medium">A/C Model</h3>
          <span>{{
            dailyReport.helicopter.model ? dailyReport.helicopter.model : "N/A"
          }}</span>
        </div>
        <div class="flex gap-4">
          <h3 class="font-medium">A/C Reg.</h3>
          <span>{{ dailyReport.helicopter.reg }}</span>
        </div>
        <div class="flex gap-4">
          <h3 class="font-medium">Date</h3>
          <span>{{ dayjs(dailyReport.date).format("MMMM Do YYYY") }}</span>
        </div>
      </div>
      <div>
        <div class="flex gap-4">
          <h3 class="font-medium">Pilot:</h3>
          <span>{{ dailyReport.pilot.name }}</span>
        </div>
        <div class="flex gap-4">
          <h3 class="font-medium">Hoist Operator:</h3>
          <span>{{ dailyReport.hoistOperator.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
const props = defineProps<{
  dailyReport: Types.Report;
}>();
</script>
