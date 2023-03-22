<template>
    <div class="flex flex-col gap-6 mx-14 my-14 w-4/5">
        <PageTitle :primaryText="title" />
    </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";

const title = "Daily Update";
</script>
