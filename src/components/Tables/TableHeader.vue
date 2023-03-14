<template>
    <table>
        <tr class="flex justify-between mx-4 mt-4 border-b-2">
            <th
                v-for="header in tableHeaderTitles"
                class="flex w-10 items-center justify-center"
            >
                {{ header }}
            </th>
        </tr>
    </table>
</template>
<script setup lang="ts">
const tableHeaderTitles: string[] = [
    "ID",
    "A/C Model",
    "A/C Registration",
    "Date",
    "Pilot",
    "Hoist Operator",
    "Daily Update",
];
</script>
