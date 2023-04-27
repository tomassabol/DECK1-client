<template>
  <div class="flex flex-col m-14 gap-12 w-full">
    <PageTitle :primaryText="`Welcome, ${name}!`" :secondaryText="position" />
    <div class="mt-72">
      <h1 class="font-bold text-2xl mb-8">Today</h1>
      <div class="flex items-center justify-center">
        <div
          class="flex flex-row flex-wrap gap-x-6 gap-y-8 justify-evenly w-11/12"
        >
          <CardReusable v-for="i in 4" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CardReusable from "@/components/CardReusable.vue";
import PageTitle from "@/components/Headers/PageTitle.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
// TODO: Get the name from the jwt token
const name = "Jim Nielsen";
const position = "Airpot Flight Officer";
</script>
