<template>
    <table class="mt-4">
        <tr
            v-for="data in tableData"
            class="flex justify-between bg-gray-50 py-2"
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
const props = defineProps<{
    tableData: Types.Report[] | Types.Update[];
    // tableFlightData?: Types.Flights[];
}>();
</script>
