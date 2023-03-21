<template>
    <table>
        <tr class="flex justify-between mx-4 mt-16 border-b-2">
            <th
                v-for="header in tableHeaders"
                class="flex w-10 items-center justify-center"
            >
                {{ header }}
            </th>
        </tr>
    </table>
</template>
<script setup lang="ts">
const props = defineProps<{
    tableHeaders: Types.TableHeader;
}>();
</script>
