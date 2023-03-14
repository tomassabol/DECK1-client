<template>
    <PageTitle :primaryText="`Welcome, ${name}!`" :secondaryText="position" />
</template>
<script setup lang="ts">
import PageTitle from "../components/PageTitle.vue";
// TODO: Get the name from the jwt token
const name = "Jim Nielsen";
const position = "Airpot Flight Officer";
</script>
