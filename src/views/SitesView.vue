<template>
    <div class="flex flex-col mx-14 my-14 w-4/5">
        <PageTitle :primaryText="title" />
        <div class="flex items-end justify-end">
            <ButtonReusable text="New Site" />
        </div>
    </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";

const title = "Sites";
</script>
