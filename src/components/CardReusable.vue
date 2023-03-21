<template>
    <div class="px-10 py-8 rounded-xl border border-gray-100 shadow-md flex">
        <img
            :src="`/icons/Helicopter.svg`"
            class="initial loading w-24 h-24 bg-purple-50 p-5 rounded-full"
            data-was-processed="true"
        />
        <div class="ml-8">
            <h1 class="font-bold text-3xl">card name</h1>
            <h2 class="text-xl">description</h2>
        </div>
    </div>
</template>
<script setup lang="ts">
import.meta.glob("../../public/icons/Helicopter.svg", {
    as: "raw",
});
</script>
