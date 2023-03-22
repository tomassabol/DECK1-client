<template>
    <div class="border border-gray-100 rounded-xl shadow-md">
        <table class="w-full">
            <tr>
                <th v-for="header in tableHeaders" class="p-3">
                    {{ header }}
                </th>
            </tr>
            <tr
                v-for="data in tableData"
                @click="redirect(data.id)"
                class="flex-auto bg-gray-50 hover:cursor-pointer text-center"
            >
                <td
                    v-for="value in Object.values(data)"
                    class="w-18 mx-6 flex-auto items-center justify-center p-3"
                >
                    <span v-if="isInstanceOf(value)">
                        {{
                            `${value.getDate()}.${value.getMonth()}.${value.getFullYear()}`
                        }}
                    </span>
                    <span v-else>{{ value }}</span>
                </td>
            </tr>
        </table>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function redirect(id: any) {
    props.reports
        ? router.push({ name: "DailyReport", params: { id: id } })
        : "";
    props.updates
        ? router.push({ name: "DailyUpdate", params: { id: id } })
        : "";
    props.flights ? router.push({ name: "Flight", params: { id: id } }) : "";
}

const props = defineProps<{
    tableHeaders: Types.TableHeader;
    tableData: Types.Report[] | Types.Update[] | Types.Flight[];
    tableReportData?: Types.Report[];
    tableUpdateData?: Types.Update[];
    tableFlightData?: Types.Flight[];
    reports?: boolean;
    updates?: boolean;
    flights?: boolean;
}>();

function isInstanceOf(value: any) {
    return value instanceof Date;
}
</script>
