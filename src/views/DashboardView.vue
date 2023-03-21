<template>
    <div class="flex flex-col mx-14 my-14 w-4/5">
        <PageTitle
            :primaryText="`Welcome, ${name}!`"
            :secondaryText="position"
        />
        <div class="mt-72">
            <h1 class="font-bold text-2xl mb-8">Today</h1>
            <div class="flex items-center justify-center">
                <div
                    class="flex flex-row flex-wrap gap-x-24 gap-y-8 justify-around w-5/6"
                >
                    <CardReusable v-for="i in 4" :key="i" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import CardReusable from "@/components/CardReusable.vue";
import PageTitle from "@/components/PageTitle.vue";
import ButtonReusable from "@/components/Buttons/ButtonReusable.vue";
// TODO: Get the name from the jwt token
const name = "Jim Nielsen";
const position = "Airpot Flight Officer";
</script>
