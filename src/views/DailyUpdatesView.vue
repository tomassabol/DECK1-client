<template>
    <div class="flex flex-col mx-14 my-14 w-4/5">
        <PageTitle :primaryText="title" />
        <div class="flex items-end justify-end">
            <ButtonReusable text="New Update" />
        </div>
    </div>
</template>
<script setup lang="ts">
import PageTitle from "../components/PageTitle.vue";
import ButtonReusable from "../components/Buttons/ButtonReusable.vue";

const title = "Daily Updates";
</script>
