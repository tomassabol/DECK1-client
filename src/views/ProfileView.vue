<template>
  <div class="flex flex-col m-14 gap-12 w-full">
    <PageTitle :primaryText="title" />
  </div>
</template>
<script setup lang="ts">
import PageTitle from "@/components/Headers/PageTitle.vue";

const title = "Profile";
</script>
