<template>
    <PageTitle primaryText="Flights"></PageTitle>
</template>
<script setup lang="ts">
import PageTitle from "../../components/PageTitle.vue";

const props = defineProps<{
    id: number;
    // tableFlightData?: Types.Flights[];
}>();
</script>
