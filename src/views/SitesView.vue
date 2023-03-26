<template>
  <div class="flex flex-col m-14 w-full">
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
