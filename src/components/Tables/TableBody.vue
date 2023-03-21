<template>
    <table class="mt-4">
        <tr
            v-for="data in tableData"
            class="flex justify-between bg-gray-50 py-2 hover:cursor-pointer"
            @click=" redirect(data.id)"
        >
                <td
                    v-for="value in Object.values(data)"
                    class="w-18 mx-6 flex items-center justify-center"
                >
                    <span v-if="(value instanceof Date)">{{
                        `${value.getDate()}.${value.getMonth()}.${value.getFullYear()}`
                    }}</span>
                    <span v-else>{{ value }}</span>
                </td>
        </tr>
    </table>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
    tableData: Types.Report[] | Types.Update[] | Types.Flight[];
    // tableFlightData?: Types.Flights[];
}>();

function redirect(id: any) {
  router.push({
    name: "DailyReport",
    params: { id: id },
  });
}
</script>
