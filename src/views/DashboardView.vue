<template>
    <div class="flex flex-col mx-14 my-14 w-4/5">
        <PageTitle
            :primaryText="`Welcome, ${name}!`"
            :secondaryText="position"
        />
    </div>
</template>
<script setup lang="ts">
import PageTitle from "../components/PageTitle.vue";
import ButtonReusable from "../components/Buttons/ButtonReusable.vue";
// TODO: Get the name from the jwt token
const name = "Jim Nielsen";
const position = "Airpot Flight Officer";
</script>
